import { IsNotEmpty } from 'class-validator';

export class ModifyLikeDTO {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  postId: number;
}
