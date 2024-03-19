import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';

@Injectable()
export class ConversationService {
  constructor(private prismaService: PrismaService) {}

  async getById(id) {
    try {
      const result = await this.prismaService.conversation.findUnique({
        where: { id, status: 1 },
        select: {
          title: true,
          icon: true,
          theme: true,
          messages: {
            select: {
              id: true,
              content: true,
              user: true,
              conversationId: true,
              createdAt: true,
            },
          },
          createdAt: true,
        },
      });
      return ApiResponse.success(result, 'Find conversation successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot find conversation');
    }
  }
  async filter(params: any) {
    try {
      const result = await this.prismaService.conversation.findMany({
        where: { ...params, status: 1 },
        select: {
          title: true,
          icon: true,
          theme: true,
          messages: {
            select: {
              id: true,
              content: true,
              user: true,
              conversationId: true,
              createdAt: true,
            },
          },
          createdAt: true,
        },
      });
      return ApiResponse.success(result, 'Filter conversation successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot filter conversation');
    }
  }
  async create(conversation) {
    try {
      const result = await this.prismaService.conversation.create({
        data: conversation,
      });
      return ApiResponse.success(result, 'Create conversation successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot create conversation');
    }
  }

  async update(id, conversation) {
    try {
      const result = await this.prismaService.conversation.update({
        where: { id },
        data: conversation,
      });
      return ApiResponse.success(result, 'Update conversation successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot update conversation');
    }
  }

  async delete(id) {
    try {
      const result = await this.prismaService.conversation.delete({
        where: { id },
      });
      return ApiResponse.success(result, 'Delete conversation successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot delete conversation');
    }
  }
}
