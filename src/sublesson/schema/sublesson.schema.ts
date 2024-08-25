import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { ImageSchema } from 'src/courses/schema/courses.schema';
import { Lesson } from 'src/lesson/schema/lesson.chema';

@Schema({ timestamps: true, versionKey: false })
export class SubLesson extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  duration: string;
  @Prop({ required: true })
  type: string;
  @Prop()
  source?: string;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Lesson' }] })
  lesson: Lesson[];
  @Prop()
  video_id?: ImageSchema;
  @Prop()
  content_quizz?: string;
  @Prop()
  questions?: string;
  @Prop()
  content_blog?: string;
  @Prop()
  content_code?: string;
  @Prop()
  solution_key?: string;
  @Prop()
  type_exercise?: string;
}

export const SubLessonModel = SchemaFactory.createForClass(SubLesson);
