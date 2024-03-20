import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { ConversationService } from './conversation.service';
import { Request } from 'express';
import { CreateConversationDTO, UpdateConversationDTO } from './dto/conversation.dto';

@Controller('conversation')
@UseGuards(MyJwtGuard)
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get('id')
  getDetailConversation(@Param() id: string) {
    return this.conversationService.getById(Number(id));
  }
  @Get()
  filterConversation(@Req() request: Request) {
    const { query } = request;
    return this.conversationService.filter(query);
  }

  @Post()
  createConversation(@Body() conversation: CreateConversationDTO) {
    return this.conversationService.create(conversation);
  }

  @Patch(':id')
  updateConversation(@Param('id') id: string, @Body() conversation: UpdateConversationDTO) {
    return this.conversationService.update(Number(id), conversation);
  }

  @Delete(':id')
  deleteConversation(@Param('id') id) {
    return this.conversationService.delete(Number(id));
  }
}
