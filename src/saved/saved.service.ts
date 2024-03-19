import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';

@Injectable()
export class SavedService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, postId: number) {
    try {
      const res = await this.prismaService.saved.create({
        data: { userId: userId, postId: postId },
      });
      return ApiResponse.success(res, 'Like Created');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot create  saved');
    }
  }

  async delete(userId: number, postId: number) {
    try {
      const res = await this.prismaService.saved.deleteMany({
        where: {
          userId,
          postId,
        },
      });
      return ApiResponse.success(res, 'Unsaved Successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Can not unlike');
    }
  }
}
