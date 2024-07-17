import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserModel } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from 'src/mail/mail.module';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { RolePermissionService } from 'src/role_permission/role_permission.service';
import { Reflector } from '@nestjs/core';
import {
  RolePermission,
  RolePermissionModel,
} from 'src/role_permission/schema/role_permission.schema';
import { UserMiddleware } from 'src/middleware/authMidlware';
import { Wallet, WalletModel } from 'src/wallet/schema/wallet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserModel },
      { name: RolePermission.name, schema: RolePermissionModel },
      { name: Wallet.name, schema: WalletModel },
    ]),
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('auth/authentication');
  }
}
