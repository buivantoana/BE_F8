import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RolePermission, RolePermissionModel } from 'src/role_permission/schema/role_permission.schema';
import { UserVouchers, UserVouchersModel } from './schema/user_vouchers.schema';
import { UserUserVouchersController } from './user_vouchers.controller';
import { UserVouchersService } from './user_vouchers.service';
import { User, UserModel } from 'src/user/schema/user.schema';
import { Notify, NotifyModel } from 'src/notify/schema/notify.schema';
import { Vouchers, VouchersModel } from 'src/vouchers/schema/vouchers.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserVouchers.name, schema: UserVouchersModel },
      { name: User.name, schema: UserModel },
      { name: Notify.name, schema: NotifyModel },
      { name: Vouchers.name, schema: VouchersModel },
    ]),
  ],
  controllers: [UserUserVouchersController],
  providers: [UserVouchersService],
})
export class UserVouchersModule {}
