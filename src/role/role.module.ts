import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleModel } from './schema/role.schema';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleModel }]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
