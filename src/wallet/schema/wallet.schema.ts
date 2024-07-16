import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Wallet extends Document {
  @Prop({ required: true })
  balance: number;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  user_id: User[];
}

export const WalletModel = SchemaFactory.createForClass(Wallet);
