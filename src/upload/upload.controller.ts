import { Bind, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadservice: UploadService) {}
  @Post('firebase')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  uploadFile(file) {
    console.log(file);
    return this.uploadservice.uploadFile(file);
  }
}
