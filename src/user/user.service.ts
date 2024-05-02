import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';
import { User } from '@prisma/client';
import { UserNameUpdateDTO, UserUpdateDTO } from './dto/user.dto';
import { isEmpty } from 'lodash';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserByToken(data: string): Promise<any> {
    const token = data.split(' ')[1];
    try {
      const data = await this.prismaService.session.findMany({
        where: {
          token,
        },
        select: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
      });

      if (!isEmpty(data)) {
        return ApiResponse.success(data[0].user, 'Get User Success');
      }
      return ApiResponse.error(401, 'User is expired');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot get data ');
    }
  }

  async getUserById(id: number): Promise<any> {
    try {
      const result: User = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });

      return ApiResponse.success(result, 'Get User By Id Success');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot get data ');
    }
  }

  async getUserByEmail(username: string): Promise<any> {
    try {
      const result = this.prismaService.user.findUnique({
        where: {
          username,
        },
        select: {
          password: false,
        },
      });
      return ApiResponse.success(result, 'Get User By UserName Success');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot get data ');
    }
  }

  async getAllUsers(): Promise<any> {
    try {
      const result = this.prismaService.user.findMany();
      return ApiResponse.success(result, 'Get List Users Success');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot get data ');
    }
  }

  async getByCondition(params) {
    //console.log('Parameters:', params);
    try {
      const result = await this.prismaService.user.findMany({
        where: {
          ...params,
          // NOT: {
          //   status: 0,
          // },
        },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          birthday: true,
          gender: true,
          phoneNumber: true,
          address: true,
          avatar: true,
          following: {
            select: {
              userId: true,
            },
          },
          followedBy: {
            select: {
              followId: true,
            },
          },
        },
      });
      return ApiResponse.success(result, 'Filter data successfully');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot get data ');
    }
  }

  async updateUser(id: number, data: UserUpdateDTO) {
    try {
      const result = await this.prismaService.user.update({
        where: {
          id,
        },
        data: data,
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          birthday: true,
          gender: true,
          phoneNumber: true,
          address: true,
          avatar: true,
        },
      });
      return ApiResponse.success(result, 'Update user successfully');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot update user');
    }
  }

  async updateUserName(id: number, user: UserNameUpdateDTO) {
    try {
      const checkExistance = await this.prismaService.user.findMany({
        where: {
          username: user.username,
        },
      });
      if (checkExistance.length === 0) {
        const result = await this.prismaService.user.update({
          where: {
            id,
          },
          data: { username: user.username },
          select: {
            id: true,
            username: true,
            email: true,
            firstName: true,
            lastName: true,
            birthday: true,
            gender: true,
            phoneNumber: true,
            address: true,
            avatar: true,
          },
        });
        return ApiResponse.success(result, 'Update username successfully');
      }
      return ApiResponse.error(402, 'Username is exist');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot update username');
    }
  }

  async deleteUser(id) {
    const userId = Number(id);
    try {
      const result = await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });
      return ApiResponse.success(result, 'Delete user successfully');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot delete user');
    }
  }
}
