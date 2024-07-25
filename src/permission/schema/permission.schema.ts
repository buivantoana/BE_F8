import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true, versionKey: false })
export class Permission extends Document {
  @Prop({ required: true })
  name: string;
}

export const PermissionModel = SchemaFactory.createForClass(Permission);
