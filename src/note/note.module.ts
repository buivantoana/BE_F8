import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { Note, NoteModel } from './schema/note.schema';
import { Lesson, LessonModel } from 'src/lesson/schema/lesson.chema';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteModel },
    ]),
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonModel },
    ]),
  ],
  controllers:[NoteController],
  providers: [NoteService],
})
export class noteModule {}
