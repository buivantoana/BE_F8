import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  ValidationPipe,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadFile(file);
    return {
      imageUrl: uploadedImage,
    };
  }
  @Post('video')
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    const uploadedVideo = await this.cloudinaryService.uploadVideo(file);
    return {
      videoUrl: uploadedVideo,
    };
  }
  @Delete(':id')
  async deleteImage(@Param('id') id: any) {
    console.log(id);
    const deleteImage = await this.cloudinaryService.deleteImage(id);
    return {
      imageUrl: deleteImage,
    };
  }
  @Delete('video/:id')
  async deleteVideo(@Param('id') id: string) {
    await this.cloudinaryService.deleteVideo(id);
    return { message: 'Video deleted successfully' };
  }
 
}
