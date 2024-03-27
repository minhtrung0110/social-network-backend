import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private readonly storage: admin.storage.Storage;

  constructor(private readonly configService: ConfigService) {
    // Kiểm tra xem Firebase đã được khởi tạo chưa trước khi khởi tạo
    if (!admin.apps.length) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const serviceAccount = require('../../../secret_key/social-network-storage-key.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: this.configService.get('FIRE_BASE_STORAGE_BUCKET'), // Lấy giá trị từ biến môi trường thay thế cho storageBucket
      });
    }
    this.storage = admin.storage();
  }

  getStorageInstance(): admin.storage.Storage {
    return this.storage;
  }
  async upload(file): Promise<string> {
    const bucket = this.getStorageInstance().bucket();
    const nameImage = file.originalname.replace(/\s+/g, '_');
    const fileName = `${Date.now()}_${nameImage}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    return new Promise((resolve, reject) => {
      stream.on('error', err => {
        reject(err);
      });
      stream.on('finish', () => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media`;
        resolve(imageUrl);
      });
      stream.end(file.buffer);
    });
  }
}
