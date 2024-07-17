import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Vouchers extends Document {
  @Prop({ required: true })
  code: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  start_date: string;
  @Prop({ required: true })
  end_date: string;
  @Prop({ required: true })
  discount_type: string;
  @Prop({ required: true })
  discount_value: number;
}

export const VouchersModel = SchemaFactory.createForClass(Vouchers);
