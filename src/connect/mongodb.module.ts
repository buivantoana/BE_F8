import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:123@cluster0.pnvccqv.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
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
