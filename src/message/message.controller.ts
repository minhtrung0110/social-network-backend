import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { MessageService } from './message.service';
import { CreateMessageDTO, UpdateMessageDTO } from './dto/message.dto';
import { Request } from 'express';

@Controller('message')
@UseGuards(MyJwtGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  filterMessage(@Req() request: Request) {
    const { query } = request;
    return this.messageService.filter(query);
  }
  @Post()
  createMessage(@Body() message: CreateMessageDTO) {
    return this.messageService.create(message);
  }

  @Patch('id')
  updateMessage(@Param() id: string, @Body() message: UpdateMessageDTO) {
    return this.messageService.update(Number(id), message);
  }

  @Delete('id')
  deleteMessage(@Param() id: string) {
    return this.messageService.delete(Number(id));
  }
}
