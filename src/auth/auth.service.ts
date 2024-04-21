import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO, CreateUserDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from '../common/model';
import { Otp, Prisma, User } from '@prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { getExpiry, isTokenExpired } from '../utils/common';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    // private mailService: MailService,
    @InjectQueue('send-mail')
    private sendMail: Queue,
  ) {}

  async register(createUserDTO: CreateUserDTO) {
    //generate password to hashedPassword
    const hashedPassword = await argon.hash(createUserDTO.password);
    const keyName = createUserDTO.email.split('@');
    // create user
    try {
      //insert data to database
      const user = await this.prismaService.user.create({
        data: {
          username: keyName[0],
          email: createUserDTO.email,
          password: hashedPassword,
          firstName: createUserDTO.firstName,
          lastName: createUserDTO.lastName,
          phoneNumber: createUserDTO.phoneNumber,
          status: 0,
        },
        //0 : disabled - 1 :active 2:block
        //only select id, email, createdAt
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      // send mail in queues
      if (user) {
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const otpPayload: Prisma.OtpUncheckedCreateInput = {
          userId: user.id,
          code: token,
          useCase: 'VE',
          expiresAt: getExpiry(),
        };
        const OTP = await this.prismaService.otp.create({
          data: otpPayload,
        });
        if (OTP) {
          // await this.mailService.sendUserConfirmation(createUserDTO, token);
          const respond = await this.sendMail.add(
            'register',
            {
              user: createUserDTO,
              token,
            },
            {
              removeOnComplete: true,
            },
          );
          return ApiResponse.success(user, 'Send OTP successfully !');
        }
        return ApiResponse.error(400, 'Can not save otp');
      }
      return ApiResponse.error(400, 'Can not save account');
      //await this.signJwtToken(user.id, user.email);
    } catch (error) {
      if (error.code == 'P2002') {
        return ApiResponse.error(error.code, 'User with this email already exists');
      }
      return ApiResponse.error(error.code, 'Cannot register account!');
    }
  }

  async verifyEmail(param) {
    try {
      const { userId, token } = param;
      const otp: Otp[] = await this.prismaService.otp.findMany({
        where: {
          userId: Number(userId),
          useCase: 'VE',
        },
      });
      console.log('OTP', otp);
      if (otp[0]) {
        //console.log('check', token === otp[0].code, !isTokenExpired(otp[0].expiresAt));
        if (token === otp[0].code && !isTokenExpired(otp[0].expiresAt)) {
          const res = await this.prismaService.user.update({
            where: {
              id: Number(userId),
            },
            data: {
              status: 1,
            },
          });
          return ApiResponse.success(res, 'Email verified successfully ');
        }
      }
      return ApiResponse.error(400, 'Invalid token');
    } catch (error) {
      console.log(error);
      return ApiResponse.error(error.code, 'Invalid token');
    }
  }

  async login(authDTO: AuthDTO) {
    //find user with input email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      //throw new ForbiddenException('User not found');
      return ApiResponse.error(400, 'User not found');
    }
    const passwordMatched = await argon.verify(user.password, authDTO.password);
    if (!passwordMatched) {
      //throw new ForbiddenException('Incorrect password');
      return ApiResponse.error(400, 'Incorrect password');
    } else {
      delete user.password; //remove 1 field in the object
      const jwtToken = await this.signJwtToken(user.id, user.email);
      try {
        const res = await this.prismaService.session.create({
          data: {
            userId: user.id,
            token: jwtToken.accessToken,
            expiresAt: new Date(Date.now() + Number(jwtToken.expiresAt) * 1000),
          },
        });
        console.log('Response', res);
      } catch (err) {
        console.log(err);
      }
      return ApiResponse.success(jwtToken, 'Login successful');
    }
  }

  // //now convert to an object, not string
  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string; expiresAt: number }> {
    const payload = {
      sub: userId,
      email,
    };
    const expiresInInSeconds = 60 * 72 * 60; //2 * 3600;
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: expiresInInSeconds,
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
      expiresAt: expiresInInSeconds,
    };
  }

  async validateUser(data) {
    const user: User = await this.prismaService.user.findUnique({ where: { email: data.email } });

    if (user) {
      return user;
    }
    //insert data to database
    try {
      const keyName = data.email.split('@');
      return await this.prismaService.user.create({
        data: {
          username: keyName[0],
          email: data.email,
          password: '',
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: data.picture,
          //phoneNumber: data.phoneNumber,
          status: 1,
        },
        //only select id, email, createdAt
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async findUser(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async logout(data) {
    const token = data.split(' ')[1];
    //const decodeToken = this.jwtService.decode(token);
    try {
      const res = await this.prismaService.session.deleteMany({
        where: { token },
      });
      console.log(res);
      return ApiResponse.success(null, 'Logout successfully');
    } catch (err) {
      return ApiResponse.error(400, 'Cannot log out');
    }
  }

  async checkExistSession(data) {
    const token = data.split(' ')[1];
    try {
      await this.prismaService.session.findMany({
        where: { token },
      });
      return ApiResponse.success({ session: true }, 'Token is add missed');
    } catch (err) {}
  }

  async renewSession(data) {
    const token = data.split(' ')[1];
    try {
      const newExpires = new Date(Date.now() + 60 * 3600 * 1000);
      const res = await this.prismaService.session.updateMany({
        where: {
          token,
        },
        data: {
          expiresAt: newExpires,
        },
      });
      return ApiResponse.success({ expiresAt: newExpires }, 'Session is renewed.');
    } catch (err) {
      return ApiResponse.error(400, 'Cannot renew session');
    }
  }

  handlerLogin() {
    return 'handlerLogin';
  }

  handlerRedirect() {
    return 'handlerRedirect';
  }
}
