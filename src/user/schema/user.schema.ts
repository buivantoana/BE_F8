import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Courses, ImageSchema } from 'src/courses/schema/courses.schema';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  email: string;
  @Prop()
  password?: string;
  @Prop()
  image: ImageSchema;
  @Prop({ default: 'member' })
  role: string;
  @Prop()
  user_name: string;
  @Prop()
  uid?: string;
}

export const UserModel = SchemaFactory.createForClass(User);
