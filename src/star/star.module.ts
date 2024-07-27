import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Star, StarModel } from './schema/star.schema';
import { StarController } from './star.controller';
import { StarService } from './star.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Star.name, schema: StarModel },
    ]),
  ],
  controllers: [StarController],
  providers: [StarService],
})
export class StarModule {}
