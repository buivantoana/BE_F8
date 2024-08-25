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
import { LessonService } from './lesson.service';
import { idLessonDto, LessonDto } from './dto/lesson.dto';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { Roles } from 'src/guards/role.decorator';

@Controller('lesson')
@UseGuards(JwtAuthGuard)
export class LessonController {
  constructor(private lessonService: LessonService) {}
  @Post('')
  @Roles('create_courses')
  async createLesson(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    lesson: LessonDto,
  ) {
    try {
      return await this.lessonService.createLesson(lesson);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  @Roles('edit_courses')
  async updateLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idLessonDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    lesson: any,
  ) {
    try {
      return await this.lessonService.updateLesson(String(id), lesson);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put('arrange/:id')
  @Roles('edit_courses')
  async updateArrangeLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idLessonDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    lesson: any,
  ) {
    try {
      return await this.lessonService.updateArrangeLesson(String(id), lesson);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id/:idCourses')
  @Roles('delete_courses')
  async deleteLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idLessonDto,
    @Param('idCourses') idCourses: string,
  ) {
    try {
      return await this.lessonService.deleteLesson(String(id),String(idCourses));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllLesson() {
    try {
      return await this.lessonService.findAllLesson();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idLessonDto,
  ) {
    try {
      return await this.lessonService.findOneLesson(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
