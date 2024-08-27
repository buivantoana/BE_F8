import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/datn')],
})
export class MongodbConnect implements OnModuleInit {
  async onModuleInit() {
    try {
      mongoose.connection;
      console.log('connect success');
    } catch (error) {
      console.log('connect faild', error);
    }
  }
}
