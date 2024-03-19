import { Module } from '@nestjs/common';
import { UserConversationService } from './userconversation.service';

@Module({
  providers: [UserConversationService],
})
export class UserconversationModule {}
