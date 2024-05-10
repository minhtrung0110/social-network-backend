import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';
import { CreatePostDTO } from './dto/post.dto';
import { convertRealType } from '../utils/common';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async getPost(id: number) {
    try {
      const res = await this.prismaService.post.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          caption: true,
          tags: true,
          imageUrl: true,
          scope: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
            },
          },
          Like: {
            select: {
              userId: true,
            },
          },
          // comments: {
          //   select: {
          //     content: true,
          //     user: {
          //       select: {
          //         id: true,
          //         firstName: true,
          //         lastName: true,
          //         username: true,
          //         avatar: true,
          //       },
          //     },
          //   },
          // },
          postSaved: {
            select: {
              userId: true,
            },
          },
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return ApiResponse.success(res, 'Get post successful');
    } catch (e) {
      return ApiResponse.error(e.code, 'Cannot get Post');
    }
  }

  async getPostsByCondition(params) {
    const { page, perPage, ...filter } = convertRealType(params);
    //const filter = convertRealType(rest);
    let paginate = {};
    if (page && perPage) {
      paginate = { take: +perPage, skip: perPage * (page - 1) };
    }

    try {
      const res = await this.prismaService.post.findMany({
        where: filter,
        select: {
          id: true,
          caption: true,
          tags: true,
          imageUrl: true,
          scope: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
            },
          },
          Like: {
            select: {
              userId: true,
            },
          },
          comments: {
            select: {
              id: true,
            },
          },
          createdAt: true,
          updatedAt: true,
          status: true,
        },
        ...paginate,
      });
      return ApiResponse.success(res, 'Filter post successful');
    } catch (e) {
      return ApiResponse.error(e.code, 'Cannot get Posts');
    }
  }

  async getInfinitePosts(params) {
    const filter = convertRealType(params);
    const take = filter.perPage;
    const skip = take * (filter.page - 1);
    try {
      const res = await this.prismaService.post.findMany({
        where: filter,
        select: {
          id: true,
          caption: true,
          tags: true,
          imageUrl: true,
          scope: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
            },
          },
          Like: {
            select: {
              userId: true,
            },
          },
          comments: {
            select: {
              id: true,
            },
          },
          createdAt: true,
          updatedAt: true,
          status: true,
        },
        take,
        skip,
      });
      return ApiResponse.success(res, 'Filter post successful');
    } catch (e) {
      return ApiResponse.error(e.code, 'Cannot get Posts');
    }
  }

  async create(post: CreatePostDTO) {
    try {
      const result = await this.prismaService.post.create({
        data: { ...post, status: 1 },
      });
      return ApiResponse.success(result, 'Create Post Successful');
    } catch (err) {
      // console.log(err);
      return ApiResponse.error(err.code, 'Cannot Create Posts');
    }
  }

  async update(id: number, post) {
    console.log('Update', id, post);
    try {
      const result = await this.prismaService.post.update({
        where: {
          id,
        },
        data: post,
      });
      return ApiResponse.success(result, 'Update Post Successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot Update Posts');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.prismaService.post.delete({
        where: {
          id,
        },
      });
      return ApiResponse.success(result, 'Delete Post Successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot Delete Posts');
    }
  }
}
