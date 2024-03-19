import { Module } from '@nestjs/common';
import { UserConversationService } from './userconversation.service';
import { UserConversationController } from './userconversation.controller';

@Module({
  controllers: [UserConversationController],
  providers: [UserConversationService],
})
export class UserConversationModule {}
