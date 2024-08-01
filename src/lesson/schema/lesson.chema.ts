import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { Courses } from 'src/courses/schema/courses.schema';
import { SubLesson } from 'src/sublesson/schema/sublesson.schema';

@Schema({ timestamps: true, versionKey: false })
export class Lesson extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  duration: number;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'SubLesson' }] })
  sub_lesson: SubLesson[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Courses' }] })
  courses_id: Courses[];
}

export const LessonModel = SchemaFactory.createForClass(Lesson);
