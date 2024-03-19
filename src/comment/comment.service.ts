import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';
import { convertNumbers } from '../utils/common';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async filter(params) {
    const filter = convertNumbers(params);
    console.log(filter);
    try {
      const result = await this.prismaService.comment.findMany({
        where: {
          ...filter,
        },
      });
      return ApiResponse.success(result, 'Filter comment successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot filter comment');
    }
  }
  async create(comment) {
    try {
      const result = await this.prismaService.comment.create({
        data: comment,
      });
      return ApiResponse.success(result, 'Create comment successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot create comment');
    }
  }
  async update(id: number, data) {
    try {
      const result = await this.prismaService.comment.update({
        where: { id },
        data,
      });
      return ApiResponse.success(result, 'Update comment successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot update comment');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.prismaService.comment.delete({
        where: { id },
      });
      return ApiResponse.success(result, 'Delete comment successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot delete comment');
    }
  }
}
