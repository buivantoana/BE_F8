import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Comments } from './schema/comments.schema';
import { Notify } from 'src/notify/schema/notify.schema';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentModel: Model<Comments>,

    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Notify.name) private readonly notifyModel: Model<Notify>,
  ) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    // console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getCommentsForProduct')
  async handleGetComments(client: Socket, productId: any) {
    try {
      const comments = await this.commentModel
        .find({
          courses_id: [productId.courses_id],
          lesson_id: productId.lesson_id,
        })
        .populate(['user_id'])
        .populate('comments_child.user_id')
        .lean()
        .exec();
      client.emit('allComments', comments);
      client.join(productId.courses_id);
    } catch (error) {
      console.error('Error fetching comments from the database:', error);
    }
  }
  @SubscribeMessage('getCommentsNew')
  async handleGetCommentsNew(client: Socket, payload: any) {
    try {
      const comments = await this.commentModel
      .find({
        courses_id: [payload.courses_id],
        lesson_id: payload.lesson_id,
      })
      .populate(['user_id'])
      .populate('comments_child.user_id')
      .lean()
      .exec();

    this.server.to(payload.courses_id).emit('updatedComment', comments);
    } catch (error) {
      console.error('Error fetching comments from the database:', error);
    }
  }

  @SubscribeMessage('comment')
  async handleComment(client: Socket, payload: any) {
    try {
      let data: any = await this.commentModel.create({
        content: payload.content,
        user_id: payload.user_id,
        courses_id: payload.courses_id,
        lesson_id: payload.lesson_id,
        comments_child: [],
        report_spam: [],
        report_inappropriate: [],
      });
      const comments = await this.commentModel
        .find({
          courses_id: [payload.courses_id],
          lesson_id: payload.lesson_id,
        })
        .populate(['user_id'])
        .populate('comments_child.user_id')
        .lean()
        .exec();
      this.server.to(payload.courses_id).emit('newComment', comments);
    } catch (error) {
      console.error('Error updating comment in the database:', error);
    }
  }
  @SubscribeMessage('updateComment')
  async handleUpdateComment(client: Socket, payload: any) {
    try {
      if (payload.type == 'edit_comment') {
        await this.commentModel.updateOne(
          { _id: payload.id },
          { content: payload.dataEditComment },
        );

        const comments = await this.commentModel
          .find({
            courses_id: [payload.courses_id],
            lesson_id: payload.lesson_id,
          })
          .populate(['user_id'])
          .populate('comments_child.user_id')
          .lean()
          .exec();

        this.server.to(payload.courses_id).emit('updatedComment', comments);
      } else if (payload.type == 'add_comment_child') {
        const comment: any = await this.commentModel.updateOne(
          { _id: payload.id },
          {
            $push: {
              comments_child: {
                ...payload.updatedContent,
                report_spam: [],
                report_inappropriate: [],
              },
            },
          },
        );

        if (comment) {
          const comments = await this.commentModel
            .find({
              courses_id: [payload.courses_id],
              lesson_id: payload.lesson_id,
            })
            .populate(['user_id'])
            .populate('comments_child.user_id')
            .lean()
            .exec();

          this.server.to(payload.courses_id).emit('updatedComment', comments);
        } else {
          console.log('Comment not found');
        }
      } else {
        const comment: any = await this.commentModel.updateOne(
          { _id: payload.id },
          { comments_child: payload.dataEditComment },
        );

        if (comment) {
          const comments = await this.commentModel
            .find({
              courses_id: [payload.courses_id],
              lesson_id: payload.lesson_id,
            })
            .populate(['user_id'])
            .populate('comments_child.user_id')
            .lean()
            .exec();

          this.server.to(payload.courses_id).emit('updatedComment', comments);
        } else {
          console.log('Comment not found');
        }
      }
    } catch (error) {
      console.error('Error updating comment in the database:', error);
    }
  }
  @SubscribeMessage('deleteComment')
  async handleDeleteComment(client: Socket, payload: any) {
    try {
      if (payload.type == 'comment') {
        const deletedComment: any = await this.commentModel
          .findByIdAndDelete(payload.id)
          .exec();

        if (deletedComment) {
          const comments = await this.commentModel
            .find({
              courses_id: [payload.courses_id],
              lesson_id: payload.lesson_id,
            })
            .populate(['user_id'])
            .populate('comments_child.user_id')
            .lean()
            .exec();

          this.server.to(payload.courses_id).emit('updatedComment', comments);
        }
      } else {
        const comment: any = await this.commentModel.updateOne(
          { _id: payload.id },
          { comments_child: payload.data },
        );

        if (comment) {
          const comments = await this.commentModel
            .find({
              courses_id: [payload.courses_id],
              lesson_id: payload.lesson_id,
            })
            .populate(['user_id'])
            .populate('comments_child.user_id')
            .lean()
            .exec();

          this.server.to(payload.courses_id).emit('updatedComment', comments);
        }
      }
    } catch (error) {
      console.error('Error deleting comment from the database:', error);
    }
  }

  @SubscribeMessage('editPermission')
  async handleEditPermission(client: Socket, payload: any) {
    try {
      const data = await this.userModel.findById(payload.id);
      this.server.emit('confirmEditPermission', { email: data.email });
    } catch (error) {
      console.error('Error updating comment in the database:', error);
    }
  }
  @SubscribeMessage('getNewNotify')
  async handleGetNewNotify(client: Socket, payload: any) {
    try {
      let data:any = await this.notifyModel.find({user_id:[payload.user_id]});
    
      if(data.length>0){
        this.server.emit('notifyNew', {user_id:payload.user_id,data:data.reverse()});
      }
    } catch (error) {
      console.error('Error fetching comments from the database:', error);
    }
  }
}
