import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessageDTO {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  conversationId: number;
  @IsOptional()
  status: number;
}

export class UpdateMessageDTO {
  @IsOptional()
  content: string;
  @IsOptional()
  userId: number;
  @IsOptional()
  conversationId: number;
  @IsOptional()
  status: number;
}
