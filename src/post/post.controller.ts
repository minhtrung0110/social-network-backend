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
    return this.postService.getPostsByCondition(query);
  }

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
