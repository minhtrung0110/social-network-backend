import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { FollowService } from './follow.service';
import { ModifyFollowDTO } from './dto/follow.dto';
import { Request } from 'express';

@Controller('follow')
@UseGuards(MyJwtGuard)
export class FollowController {
  constructor(private followService: FollowService) {}

  @Get()
  getAll() {
    return this.followService.get();
  }

  @Get('follower/:id')
  getFollower(@Param('id') id: string, @Req() request: Request) {
    const { query } = request;
    return this.followService.getFollowerUserById(Number(id), query);
  }

  @Get('following/:id')
  getFollowing(@Param('id') id: string, @Req() request: Request) {
    const { query } = request;
    return this.followService.getFollowingUserById(Number(id), query);
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
