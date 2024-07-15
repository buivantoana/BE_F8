import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Note } from './schema/note.schema';
import { INote } from './interface/note.interface';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>,
  ) {}
  async createNote(category: INote) {
    try {
      let data = await this.noteModel.create(category);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateNote(id: string, category: INote) {
    try {
      let data = await this.noteModel.findByIdAndUpdate(id, category, {
        new: true,
      });
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteNote(id: string) {
    try {
      let data = await this.noteModel.findByIdAndDelete(id);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findAllNote() {
    try {
      let data = await this.noteModel.find({});

      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findNoteLessonAndCourses(
    courses_id: string,
    user_id: string,
    lesson_id: string,
  ) {
    try {
      let data = await this.noteModel
        .find({
          user_id: user_id,
          courses_id: courses_id,
          sub_lesson_id: lesson_id,
        })
        .populate('sub_lesson_id')
        .lean()
        .exec();
        console.log(data);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
