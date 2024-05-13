import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { FollowService } from './follow.service';
import { ModifyFollowDTO } from './dto/follow.dto';

@Controller('follow')
@UseGuards(MyJwtGuard)
export class FollowController {
  constructor(private followService: FollowService) {}

  @Get()
  getAll() {
    return this.followService.get();
  }

  @Post()
  createLike(@Body() createFollow: ModifyFollowDTO) {
    console.log('Params:', createFollow);
    return this.followService.create(Number(createFollow.userId), Number(createFollow.followId));
  }

  @Delete()
  deleteFollow(@Body() deleteFollow: ModifyFollowDTO) {
    return this.followService.delete(Number(deleteFollow.userId), Number(deleteFollow.followId));
  }
}
