import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/model';
import { convertNumbers } from '../utils/common';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    try {
      const result = await this.prismaService.message.findMany({
        where: { status: 1 },
        select: {
          id: true,
          content: true,
          user: true,
          conversationId: true,
          createdAt: true,
        },
      });
      return ApiResponse.success(result, 'Create message successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot create message');
    }
  }

  async filter(params: any) {
    const filter = convertNumbers(params);
    try {
      const result = await this.prismaService.message.findMany({
        where: { ...filter, status: 1 },
        select: {
          id: true,
          content: true,
          user: true,
          conversationId: true,
          createdAt: true,
        },
      });
      return ApiResponse.success(result, 'Create message successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot create message');
    }
  }

  async create(value) {
    const message = convertNumbers(value);
    const data = { ...message, status: 1 };
    console.log(data);
    try {
      const result = await this.prismaService.message.create({
        data: { ...value, status: 1 },
      });
      return ApiResponse.success(result, 'Create message successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot create message');
    }
  }

  async update(id, message) {
    try {
      const result = await this.prismaService.message.update({
        where: { id },
        data: message,
      });
      return ApiResponse.success(result, 'Update message successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot update message');
    }
  }

  async delete(id) {
    try {
      const result = await this.prismaService.message.delete({
        where: { id },
      });
      return ApiResponse.success(result, 'Delete message successful');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot delete message');
    }
  }
}
