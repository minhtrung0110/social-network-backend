import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO, CreateUserDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from '../common/model';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDTO: CreateUserDTO) {
    //generate password to hashedPassword
    const hashedPassword = await argon.hash(createUserDTO.password);
    const keyName = createUserDTO.email.split('@');
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
          status: 1,
        },
        //only select id, email, createdAt
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return ApiResponse.success(user, 'Register account successfully !');
      //await this.signJwtToken(user.id, user.email);
    } catch (error) {
      if (error.code == 'P2002') {
        //throw new ForbiddenException(error.message)
        //for simple
        //throw new ForbiddenException('User with this email already exists');
        return ApiResponse.error(error.code, 'User with this email already exists');
      }
      return ApiResponse.error(error.code, 'Cannot register account!');
    }
    //you should add constraint "unique" to user table
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
    }
    delete user.password; //remove 1 field in the object
    const token = await this.signJwtToken(user.id, user.email);
    return ApiResponse.success(token.accessToken, 'Login successful');
  }
  // //now convert to an object, not string
  async signJwtToken(userId: number, email: string): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '100h',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
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
          token: data.accessToken,
          //phoneNumber: data.phoneNumber,
          status: 1,
        },
        //only select id, email, createdAt
        select: {
          id: true,
          email: true,
          token: true,
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
  handlerLogin() {
    return 'handlerLogin';
  }

  handlerRedirect() {
    return 'handlerRedirect';
  }
}
