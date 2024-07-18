import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {  Notify, NotifyModel } from './schema/notify.schema';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notify.name, schema: NotifyModel },
    ]),
  ],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
