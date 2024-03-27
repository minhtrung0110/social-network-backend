import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { FirebaseService } from '../3_party/firebase/firebase.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, FirebaseService],
})
export class UploadModule {}
