import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Categories extends Document {
  @Prop({ required: true })
  name: string;
 
}

export const CategoriesModel = SchemaFactory.createForClass(Categories);
