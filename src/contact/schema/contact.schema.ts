import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Contact extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  subject: string;
  @Prop({ required: true })
  message: string;
  @Prop({ required: true })
  status: boolean;
}

export const ContactModel = SchemaFactory.createForClass(Contact);
