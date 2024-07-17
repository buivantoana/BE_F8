import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostModel } from './schema/post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {
  RolePermission,
  RolePermissionModel,
} from 'src/role_permission/schema/role_permission.schema';
import { Wallet, WalletModel } from 'src/wallet/schema/wallet.schema';
import { Transactions, TransactionsModel } from 'src/transactions/schema/transaction.schema';
import { Notify, NotifyModel } from 'src/notify/schema/notify.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostModel },
      { name: RolePermission.name, schema: RolePermissionModel },
      { name: Wallet.name, schema: WalletModel },
      { name: Transactions.name, schema: TransactionsModel },
      { name: Notify.name, schema: NotifyModel },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
