import {
  Bind,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Express } from 'express';

@Controller('upload')
//@UseGuards(MyJwtGuard)
//@UseGuards(GoogleGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('firebase')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  uploadFileAndPassValidation(
    @Body() body,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.uploadFile(file);
  }
}
