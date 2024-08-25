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
  UseGuards,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { SubLessonService } from './sublesson.service';
import { idSubLessonDto, SubLessonDto } from './dto/sublesson.dto';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { Roles } from 'src/guards/role.decorator';

@Controller('sublesson')
@UseGuards(JwtAuthGuard)
export class SubLessonController {
  constructor(private subLessonService: SubLessonService) {}
  @Post('')
  @Roles('create_courses')
  async createSubLesson(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    lesson: any,
  ) {
    try {
      return await this.subLessonService.createSubLesson(lesson);
      
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  @Roles('edit_courses')
  async updateSubLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idSubLessonDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    lesson: any,
  ) {
    try {
      return await this.subLessonService.updateSubLesson(String(id), lesson);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id/:idLesson')
  @Roles('delete_courses')
  async deleteSubLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idSubLessonDto,
    @Param('idLesson') idLesson: string,
  ) {
    try {
      return await this.subLessonService.deleteSubLesson(String(id),String(idLesson));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllSubLessonn() {
    try {
      return await this.subLessonService.findAllSubLesson();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneSubLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idSubLessonDto,
  ) {
    try {
      return await this.subLessonService.findOneSubLesson(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
