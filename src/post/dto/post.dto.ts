import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  caption: string;
  @IsOptional()
  tags: string;
  @IsNotEmpty()
  @IsIn(['private', 'public', 'follower'])
  scope: 'private' | 'public' | 'follower';
  @IsNotEmpty()
  userId: number;
}

export class UpdatePostDTO {
  @IsOptional()
  caption: string;
  @IsOptional()
  tags: string;
  @IsOptional()
  imageUrl: string;
  @IsOptional()
  @IsIn(['private', 'public', 'follower'])
  scope?: 'private' | 'public' | 'follower';
  @IsOptional()
  userId: number;
}
export class SearchPostDTO {
  @IsOptional()
  id?: number;
  @IsOptional()
  caption?: string;
  @IsOptional()
  tags?: string;
  @IsOptional()
  imageUrl?: string;
  @IsOptional()
  @IsIn(['private', 'public', 'follower'])
  scope?: 'private' | 'public' | 'follower';
  @IsOptional()
  userId?: number;
  @IsOptional()
  status?: number;
}
