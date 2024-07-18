import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { Categories } from 'src/categories/schema/categories.schema';
import { Lesson } from 'src/lesson/schema/lesson.chema';
import { User } from 'src/user/schema/user.schema';

@Schema()
export class ImageSchema {
  @Prop()
  url: string;
  @Prop()
  public_id: string;
}
@Schema({ timestamps: true, versionKey: false })
export class Courses extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  image: ImageSchema;
  @Prop({ required: true })
  instructor: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  rating: number;
  @Prop({ required: true })
  result_courses: string[];
  @Prop({ required: true })
  courses_requirements: string[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Categories' }] })
  category_id: Categories[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  students: User[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Lesson' }] })
  lesson: Lesson[];
}

export const CoursesModel = SchemaFactory.createForClass(Courses);
