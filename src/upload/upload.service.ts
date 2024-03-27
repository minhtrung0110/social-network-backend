import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../3_party/firebase/firebase.service';
import { ApiResponse } from '../common/model';

@Injectable()
export class UploadService {
  constructor(private readonly firebaseService: FirebaseService) {}
  async uploadFile(file) {
    try {
      const result = await this.firebaseService.upload(file);
      return ApiResponse.success(result, 'Get File Success');
    } catch (err) {
      return ApiResponse.error(err.code, 'Cannot get file');
    }
  }

  // async uploadImage(file): Promise<string> {
  //   const storage = this.firebaseService.getStorageInstance();
  //   const bucket = storage.bucket();
  //   const fileName = `${Date.now()}_${file.originalname}`;
  //   const fileUpload = bucket.file(fileName);
  //
  //   const stream = fileUpload.createWriteStream({
  //     method: {
  //       contentType: file.minetype,
  //     },
  //   });
  //   return new Promise((resolve, reject) => {
  //     stream.on('error', err => {
  //       reject(err);
  //     });
  //     stream.on('finish', () => {
  //       const imageUrl = `https://www.googleapis.com/${bucket.name}/${fileName}`;
  //       resolve(imageUrl);
  //     });
  //     stream.end(file.bucket);
  //   });
  // }
}
