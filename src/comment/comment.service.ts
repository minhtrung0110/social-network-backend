import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';
import { convertRealType } from '../utils/common';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async filter(params) {
    const filter = convertRealType(params); //convertNumbers(params);
    console.log(filter);
    try {
      const result = await this.prismaService.comment.findMany({
        where: {
          ...filter,
        },
        orderBy: [
          {
            updatedAt: 'desc',
          },
        ],
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
          postId: true,
          replyId: true,
          updatedAt: true,
        },
      });
      return ApiResponse.success(result, 'Filter comment successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot filter comment');
    }
  }

  async paginate(params) {
    const filter = convertRealType(params); //convertNumbers(params);
    // {page:1,perPage:4}
    const take = filter.perPage;
    const skip = take * (filter.page - 1);
    try {
      const result = await this.prismaService.comment.findMany({
        where: {
          postId: filter.postId,
        },
        orderBy: [
          {
            updatedAt: 'desc',
          },
        ],
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
          postId: true,
          replyId: true,
          updatedAt: true,
        },
        skip,
        take,
      });
      return ApiResponse.success(result, 'Paginate comment successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot paginate comment');
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
