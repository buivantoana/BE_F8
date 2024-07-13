import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RolePermission, RolePermissionModel } from 'src/role_permission/schema/role_permission.schema';
import { Vouchers, VouchersModel } from './schema/vouchers.schema';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { UserVouchers, UserVouchersModel } from 'src/user_vouchers/schema/user_vouchers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vouchers.name, schema: VouchersModel },
      { name: UserVouchers.name, schema: UserVouchersModel },
     
    ]),
  ],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
