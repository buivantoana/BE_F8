import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { Courses } from 'src/courses/schema/courses.schema';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Order extends Document {
  @Prop({ required: true })
  status: boolean;
  @Prop({ required: true })
  price: number;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Courses' }] })
  courses_id: Courses[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  user_id: User[];
}

export const OrderModel = SchemaFactory.createForClass(Order);
