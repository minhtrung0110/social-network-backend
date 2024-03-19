import { IsNotEmpty } from 'class-validator';

export class ModifySavedDTO {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  postId: number;
}
