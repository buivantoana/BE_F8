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
import { NoteService } from './note.service';
import { NoteDto, idNoteDto } from './dto/note.dto';

  
  @Controller('note')
  export class NoteController {
    constructor(private noteService: NoteService) {}
    @Post('')
    async createNote(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      note: NoteDto,
    ) {
      try {
        return await this.noteService.createNote(note);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Put(':id')
    async updateNote(
      @Param('id', new ValidationPipe({ transform: true })) id: idNoteDto,
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      note: NoteDto,
    ) {
      try {
        return await this.noteService.updateNote(
          String(id),
          note,
        );
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Delete(':id')
    async deleteNote(
      @Param('id', new ValidationPipe({ transform: true })) id: idNoteDto,
    ) {
      try {
        return await this.noteService.deleteNote(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get('')
    async findAllNote() {
      try {
        return await this.noteService.findAllNote();
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get(':courses_id/:lesson_id/:user_id')
    async findOneNote(
      @Param('courses_id', new ValidationPipe({ transform: true })) courses_id: idNoteDto,
      @Param('lesson_id', new ValidationPipe({ transform: true })) lesson_id: idNoteDto,
      @Param('user_id', new ValidationPipe({ transform: true })) user_id: idNoteDto,
    ) {
      try {
        return await this.noteService.findNoteLessonAndCourses(String(courses_id),String(user_id),String(lesson_id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
  }
  