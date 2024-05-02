import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { LikeService } from './like.service';
import { ModifyLikeDTO } from './dto/like.dto';

@Controller('like')
@UseGuards(MyJwtGuard)
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post()
  createLike(@Body() createLike: ModifyLikeDTO) {
    console.log('Params:', createLike);
    return this.likeService.create(Number(createLike.userId), Number(createLike.postId));
  }

  @Delete()
  deleteLike(@Body() deleteLike: ModifyLikeDTO) {
    return this.likeService.delete(Number(deleteLike.userId), Number(deleteLike.postId));
  }
}
