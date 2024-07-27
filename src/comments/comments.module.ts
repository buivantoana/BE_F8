import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsModel } from './schema/comments.schema';
import { AppGateway } from './comments.gateway';
import { User, UserModel } from 'src/user/schema/user.schema';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { Notify, NotifyModel } from 'src/notify/schema/notify.schema';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsModel },
      { name: User.name, schema: UserModel },
      { name: Notify.name, schema: NotifyModel },
    ]),
  ],
  controllers:[CommentController],
  providers: [AppGateway,CommentService],
})
export class CommentsModule {}
