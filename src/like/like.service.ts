import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';

@Injectable()
export class LikeService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, postId: number) {
    try {
      const res = await this.prismaService.like.create({
        data: { userId: userId, postId: postId },
      });
      return ApiResponse.success(res, 'Like Created');
    } catch (err) {
      return ApiResponse.error(err.code, 'Can not create like');
    }
  }

  async delete(userId: number, postId: number) {
    try {
      const res = await this.prismaService.like.deleteMany({
        where: {
          userId,
          postId,
        },
      });
      return ApiResponse.success(res, 'Unlike Successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Can not unlike');
    }
  }
}
