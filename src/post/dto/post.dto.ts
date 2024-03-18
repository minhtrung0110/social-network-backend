export class CreatePostDTO {
  caption: string;
  tags: string;
  imageUrl?: string;
  scope: 'private' | 'public' | 'follower';
  userId: number;
  status: number;
}

export class UpdatePostDTO {
  caption?: string;
  tags?: string;
  imageUrl?: string;
  scope?: 'private' | 'public' | 'follower';
  userId?: number;
  status?: number;
}
export class SearchPostDTO {
  id?: number;
  caption?: string;
  tags?: string;
  imageUrl?: string;
  scope?: 'private' | 'public' | 'follower';
  userId?: number;
  status?: number;
}
