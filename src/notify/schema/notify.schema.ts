import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Notify extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  message: string;
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  read: boolean;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  user_id: User[];
}

export const NotifyModel = SchemaFactory.createForClass(Notify);
