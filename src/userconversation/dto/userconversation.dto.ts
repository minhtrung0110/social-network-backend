import { IsNotEmpty } from 'class-validator';

export class ModifyUserConversationDTO {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  conversationId: number;
}
