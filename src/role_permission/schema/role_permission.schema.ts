import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Permission } from 'src/permission/schema/permission.schema';
import { Role } from 'src/role/schema/role.schema';

@Schema({ timestamps: true, versionKey: false })
export class RolePermission extends Document {
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Role' }] })
  role_id: Role[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Permission' }] })
  permission: Permission[];
}

export const RolePermissionModel = SchemaFactory.createForClass(RolePermission);
