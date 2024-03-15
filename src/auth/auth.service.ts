import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
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
        },
        //only select id, email, createdAt
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true,
        // },
      });
      return user;
      //await this.signJwtToken(user.id, user.email);
    } catch (error) {
      if (error.code == 'P2002') {
        //throw new ForbiddenException(error.message)
        //for simple
        throw new ForbiddenException('User with this email already exists');
      }
    }
    //you should add constraint "unique" to user table
  }
  // async login(authDTO: AuthDTO) {
  //   //find user with input email
  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       email: authDTO.email,
  //     },
  //   });
  //   if (!user) {
  //     throw new ForbiddenException('User not found');
  //   }
  //   const passwordMatched = await argon.verify(user.password, authDTO.password);
  //   if (!passwordMatched) {
  //     throw new ForbiddenException('Incorrect password');
  //   }
  //   delete user.password; //remove 1 field in the object
  //   return await this.signJwtToken(user.id, user.email);
  // }
  // //now convert to an object, not string
  // async signJwtToken(userId: number, email: string): Promise<{ accessToken: string }> {
  //   const payload = {
  //     sub: userId,
  //     email,
  //   };
  //   const jwtString = await this.jwtService.signAsync(payload, {
  //     expiresIn: '10m',
  //     secret: this.configService.get('JWT_SECRET'),
  //   });
  //   return {
  //     accessToken: jwtString,
  //   };
  // }
}
