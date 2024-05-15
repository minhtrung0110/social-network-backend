import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { CreatePostDTO, UpdatePostDTO } from './dto/post.dto';
import { PostService } from './post.service';
import { Request } from 'express';

@Controller('post')
@UseGuards(MyJwtGuard)
export class PostController {
  constructor(private postService: PostService) {}

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.getPost(Number(id));
  }

  @Get()
  getAllPosts(@Req() request: Request) {
    const { query } = request;
    if (query.hasOwnProperty('compact')) {
      const { compact, ...params } = query;
      return this.postService.getListCompactPosts(params);
    }
    return this.postService.getPostsByCondition(query);
  }

  // @Get('related/:userId')
  // getAllRelatedPosts(@Param('userId') userId: number) {
  //   return this.postService.getRelatedPosts(userId);
  // }

  @Post()
  createPost(@Body() post: CreatePostDTO) {
    return this.postService.create(post);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() post: UpdatePostDTO) {
    return this.postService.update(Number(id), post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.delete(Number(id));
  }
}
