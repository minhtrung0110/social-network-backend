import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';

@Injectable()
export class UserConversationService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, conversationId: number) {
    try {
      const res = await this.prismaService.userConversation.create({
        data: { userId: userId, conversationId: conversationId },
      });
      return ApiResponse.success(res, 'userConversation Created');
    } catch (err) {
      return ApiResponse.error(err.code, 'Can not create userConversation');
    }
  }

  async delete(userId: number, conversationId: number) {
    try {
      const res = await this.prismaService.userConversation.deleteMany({
        where: {
          userId,
          conversationId,
        },
      });
      return ApiResponse.success(res, 'Delete userConversation Successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Can not delete userConversation');
    }
  }
}
