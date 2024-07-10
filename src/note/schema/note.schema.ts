import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { Courses } from 'src/courses/schema/courses.schema';
import { Lesson } from 'src/lesson/schema/lesson.chema';
import { SubLesson } from 'src/sublesson/schema/sublesson.schema';
import { User } from 'src/user/schema/user.schema';



@Schema({ timestamps: true, versionKey: false })
export class Note extends Document {
  @Prop({ required: true })
  content: string;
   @Prop({ required: true })
  time: string;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  user_id: User[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Courses' }] })
  courses_id: Courses[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'SubLesson' }] })
  sub_lesson_id: SubLesson[];
  
}

export const NoteModel = SchemaFactory.createForClass(Note);
