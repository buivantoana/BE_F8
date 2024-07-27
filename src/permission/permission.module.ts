import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionModel } from './schema/permission.schema';
import { PermissionService } from './permission.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionModel },
    ]),
  ],
  providers: [PermissionService],
})
export class PermissionModule {}
