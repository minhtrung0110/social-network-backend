import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';

@Injectable()
export class FollowService {
  constructor(private prismaService: PrismaService) {}

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
