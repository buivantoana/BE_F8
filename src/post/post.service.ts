import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { IPost } from './interface/post.interface';
import { Wallet } from 'src/wallet/schema/wallet.schema';
import { Transactions } from 'src/transactions/schema/transaction.schema';
import { Notify } from 'src/notify/schema/notify.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
    @InjectModel(Transactions.name) private readonly transactionModel: Model<Transactions>,
    @InjectModel(Notify.name) private readonly notifyModel: Model<Notify>,
  ) {}
  async createPost(post: IPost) {
    try {
      let data = await this.postModel.create({...post,likes:[],reward:false});
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateActivePost(id: string) {
    try {
      let data = await this.postModel.findOneAndUpdate(
        { _id: id },
        { $set: { active: true } },
        { returnOriginal: false },
      );
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      await this.notifyModel.create({user_id:[data.author[0]],title:"Bài viết của bạn đã được duyệt.",message:data.title,url:`/detail_blog/${data._id}`,read:false})
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(id: string, post: IPost) {
    try {
      let data = await this.postModel.findByIdAndUpdate(id, post, {
        new: true,
      });
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(id: string) {
    try {
      let data = await this.postModel.findByIdAndDelete(id);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async likesPost(id: string, user_id: any) {
    try {
      let data: any = await this.postModel.findById(id);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
  
      const userIndex = data.likes.indexOf(user_id);
  
      if (userIndex === -1) { 
        data.likes.push(user_id);
        const updates: any = { $push: { likes: user_id } };
  
        if (data.likes.length > 1 && data.reward === false) {
          updates.$set = { reward: true };
          await this.walletModel.updateOne(
            { user_id: data.author[0] },
            { $inc: { balance: 100000 } }
          );
          await this.transactionModel.create({type:"reward",amount:"100000",status:"completed",user_id:[data.author[0]],note:"Phần thuởng cho bài viết đạt được 1k tym"});
          await this.notifyModel.create({user_id:[data.author[0]],title:"Bạn nhận đựơc 100.000Đ vào ví.",message:`Chúc mừng bài viết của bạn đã đạt 1k tym.Của bài viết ${data.title}`,url:`/detail_blog/${data._id}`,read:false})
        }
  
        await this.postModel.updateOne(
          { _id: data._id },
          updates
        );
  
        return {
          status: 0,
          message: 'liked',
        };
      } else { 
        data.likes.splice(userIndex, 1);
        await this.postModel.updateOne(
          { _id: data._id },
          { $pull: { likes: user_id } }
        );
  
        return {
          status: 0,
          message: 'unliked',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 1,
        message: 'failed',
      };
    }
  }
  
  async fillAllPost() {
    try {
      let data = await this.postModel.find();

      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findAllUserPost(id: string) {
    try {
      let data = await this.postModel
        .find({ author: [id] })
        .populate(['author'])
        .lean()
        .exec();

      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async fillAllPostActive() {
    try {
      let data = await this.postModel
        .find({ active: true })
        .populate(['author'])
        .lean()
        .exec();

      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  
  async findPaginationPostActive(req: any) {
    try {
      const page = Number(req.query?.page);
      const size = Number(req.query?.size) || 2;
      const count = await this.postModel.countDocuments({ active: true });
      
      const data = await this.postModel
        .find({ active: true })
        .populate('author')
        .skip(page)
        .limit(size);

      if (!data || !data[0]) {
        return {
          status: 1,
          message: 'getone false',
        };
      }
      return {
        status: 0,
        message: 'getone success',
        data,
        count,
        page,
        size,
      };
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
