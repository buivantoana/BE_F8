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
} from '@nestjs/common';

import { Response, Request } from 'express';
import { NotifyService } from './notify.service';
import { NotifyDto } from './dto/notify.dto';
import { idNoteDto } from 'src/note/dto/note.dto';


@Controller('notify')
export class NotifyController {
  constructor(private notifyService: NotifyService) {}
  @Post('')
  async createNotify(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    category: NotifyDto,
  ) {
    try {
      return await this.notifyService.createNotify(category);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateNotify(
    @Param('id', new ValidationPipe({ transform: true })) id: idNoteDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    category: NotifyDto,
  ) {
    try {
      return await this.notifyService.updateNotify(
        String(id),
        category,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put('read/:id')
  async updateReadNotify(
    @Param('id', new ValidationPipe({ transform: true })) id: idNoteDto,
  ) {
    try {
      return await this.notifyService.updateReadNotify(
        String(id),
        
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteNotify(
    @Param('id', new ValidationPipe({ transform: true })) id: idNoteDto,
  ) {
    try {
      return await this.notifyService.deleteNotify(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllNotify() {
    try {
      return await this.notifyService.findAllNotify();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneNotify(
    @Param('id', new ValidationPipe({ transform: true })) id: idNoteDto,
  ) {
    try {
      return await this.notifyService.findUserNotify(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
