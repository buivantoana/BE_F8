import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transactions, TransactionsModel } from './schema/transaction.schema';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Notify, NotifyModel } from 'src/notify/schema/notify.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transactions.name, schema: TransactionsModel },
      { name: Notify.name, schema: NotifyModel },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
