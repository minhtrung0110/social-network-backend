import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { SavedService } from './saved.service';
import { ModifySavedDTO } from './dto/saved.dto';

@Controller('saved')
@UseGuards(MyJwtGuard)
export class SavedController {
  constructor(private savedService: SavedService) {}

  @Post()
  createSavedPost(@Body() savedPost: ModifySavedDTO) {
    return this.savedService.create(Number(savedPost.userId), Number(savedPost.postId));
  }
  @Delete()
  deleteSavedPost(@Body() deletedPost: ModifySavedDTO) {
    return this.savedService.delete(Number(deletedPost.userId), Number(deletedPost.postId));
  }
}
