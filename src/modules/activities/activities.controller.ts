import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ActivitiesUseCase } from './use-cases/activties.use-case';
import { AuthGuard } from '../auth/AuthMiddleware';
import * as admin from 'firebase-admin';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activities: ActivitiesUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllActivities() {
    return this.activities.getAllActivities();
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadActivity(@UploadedFile('file') file: Express.Multer.File) {
    if (!file) {
      throw new Error('File not found');
    }
    const bucket = admin.storage().bucket();
    const fileUpload = bucket.file(file.originalname);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        resolve({ fileUrl: publicUrl });
      });

      blobStream.end(file.buffer);
    });
  }
}
