import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Vouchers } from 'src/vouchers/schema/vouchers.schema';

@Schema({ timestamps: true, versionKey: false })
export class UserVouchers extends Document {
  @Prop({ required: true })
  status: boolean;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Vouchers' }] })
  vouchers_id: Vouchers[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  user_id: User[];
}

export const UserVouchersModel = SchemaFactory.createForClass(UserVouchers);
