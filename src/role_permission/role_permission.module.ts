import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RolePermission,
  RolePermissionModel,
} from './schema/role_permission.schema';
import { RolePermissionController } from './role_permission.controller';
import { RolePermissionService } from './role_permission.service';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RolePermission.name, schema: RolePermissionModel },
    ]),
  ],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}
