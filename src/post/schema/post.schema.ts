import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { ImageSchema } from 'src/courses/schema/courses.schema';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Post extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  image: ImageSchema;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  readers: string;
  @Prop({ required: true })
  active: boolean;
  @Prop({ required: true })
  notify: boolean;
  @Prop({ required: true })
  reward: boolean;
  @Prop()
  likes: [];
  
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  author: User[];
}

export const PostModel = SchemaFactory.createForClass(Post);
