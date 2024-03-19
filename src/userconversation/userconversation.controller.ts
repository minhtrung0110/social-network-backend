import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UserConversationService } from './userconversation.service';
import { ModifyUserConversationDTO } from './dto/userconversation.dto';

@Controller('user-conversation')
export class UserConversationController {
  constructor(private userConversationService: UserConversationService) {}

  @Post()
  createUserConversation(@Body() createUserConversation: ModifyUserConversationDTO) {
    console.log('Params:', createUserConversation);
    return this.userConversationService.create(
      Number(createUserConversation.userId),
      Number(createUserConversation.conversationId),
    );
  }
  @Delete()
  deleteUserConversation(@Body() deleteUserConversation: ModifyUserConversationDTO) {
    return this.userConversationService.delete(
      Number(deleteUserConversation.userId),
      Number(deleteUserConversation.conversationId),
    );
  }
}
