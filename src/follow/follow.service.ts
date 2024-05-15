import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';
import { isEmpty } from 'lodash';
import { convertRealType, findUser } from '../utils/common';

@Injectable()
export class FollowService {
  constructor(private prismaService: PrismaService) {}

  async get() {
    try {
      const res = await this.prismaService.follow.findMany();
      return ApiResponse.success(res, 'All data');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot get follow');
    }
  }

  async getFollowerUserById(id: number, params): Promise<any> {
    const { page, perPage, search } = convertRealType(params);
    let paginate = {};
    if (page && perPage) {
      paginate = { take: +perPage, skip: perPage * (page - 1) };
    }
    try {
      const result = await this.prismaService.follow.findMany({
        where: {
          followId: id,
        },
        select: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
        ...paginate,
      });
      const listUsers = !isEmpty(result) ? result.map(item => item.user) : [];
      const data = search ? findUser(listUsers, search) : listUsers;
      return ApiResponse.success(data, 'Get Follower Success');
    } catch (err) {
      console.log(err);
      return ApiResponse.error(err.code, 'Cannot get follower data ');
    }
  }

  async getFollowingUserById(id: number, params): Promise<any> {
    const { page, perPage, search } = convertRealType(params);
    let paginate = {};
    if (page && perPage) {
      paginate = { take: +perPage, skip: perPage * (page - 1) };
    }
    try {
      const result = await this.prismaService.follow.findMany({
        where: {
          userId: id,
        },
        select: {
          follow: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
        ...paginate,
      });
      const listUsers = !isEmpty(result) ? result.map(item => item.follow) : [];
      const data = search ? findUser(listUsers, search) : listUsers;
      return ApiResponse.success(data, 'Get Following user Success');
    } catch (err) {
      console.log(err);
      return ApiResponse.error(err.code, 'Cannot get following user data ');
    }
  }

  async create(userId: number, followId: number) {
    try {
      const res = await this.prismaService.follow.create({
        data: { userId: userId, followId: followId },
      });
      return ApiResponse.success(res, 'Like Created');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot create follow');
    }
  }

  async delete(userId: number, followId: number) {
    try {
      const res = await this.prismaService.follow.deleteMany({
        where: {
          userId,
          followId,
        },
      });
      return ApiResponse.success(res, 'Unfollow Successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot unfollow');
    }
  }
}
