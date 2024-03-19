import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  postId: number;
  @IsOptional()
  replyId: number;
}

export class UpdateCommentDTO {
  @IsOptional()
  content: string;
  @IsOptional()
  userId: number;
  @IsOptional()
  postId: number;
  @IsOptional()
  replyId: number;
}
