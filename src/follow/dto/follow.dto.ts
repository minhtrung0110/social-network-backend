import { IsNotEmpty } from 'class-validator';

export class ModifyFollowDTO {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  followId: number;
}
