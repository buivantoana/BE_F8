import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesModel } from './schema/categories.schema';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { RolePermission, RolePermissionModel } from 'src/role_permission/schema/role_permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesModel },
      { name: RolePermission.name, schema: RolePermissionModel},
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
