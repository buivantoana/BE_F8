import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Transactions extends Document {
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  amount: string;
  @Prop({ required: true })
  status: string;
  @Prop()
  bankAccount?: string;
  @Prop()
  email_transfer?: string;
  @Prop()
  stk?: string;
  @Prop()
  qr_code?: string;
  @Prop()
  note?: string;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  user_id: User[];
}

export const TransactionsModel = SchemaFactory.createForClass(Transactions);
