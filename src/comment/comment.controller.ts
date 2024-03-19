import { Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { CommentService } from './comment.service';
import { CreateCommentDTO, UpdateCommentDTO } from './dto/comment.dto';
import { Request } from 'express';

@Controller('comment')
@UseGuards(MyJwtGuard)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  filterComment(@Req() request: Request) {
    const { query } = request;
    return this.commentService.filter(query);
  }
  @Post()
  createComment(comment: CreateCommentDTO) {
    return this.commentService.create(comment);
  }
  @Patch('id')
  updateComment(@Param('id') id: string, comment: UpdateCommentDTO) {
    return this.commentService.update(Number(id), comment);
  }

  @Delete('id')
  deleteComment(@Param('id') id: string) {
    return this.commentService.delete(Number(id));
  }
}
