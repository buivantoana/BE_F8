import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Vouchers extends Document {
 
}

export const VouchersModel = SchemaFactory.createForClass(Vouchers);
