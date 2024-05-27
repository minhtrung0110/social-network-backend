import { Controller, Get, Res } from '@nestjs/common';
import { MessageService } from '../src/message/message.service';

@Controller()
export class EventController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/chat')
  async Chat(@Res() res) {
    const messages = await this.messageService.getAll();
    res.json(messages);
  }
}
