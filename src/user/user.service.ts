import { Injectable } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { EmailService } from 'src/mail/mail.service';
import { RolePermission } from 'src/role_permission/schema/role_permission.schema';
import { Wallet } from 'src/wallet/schema/wallet.schema';

@Injectable()
export class UserService {
  private readonly secretKey = 'token';
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
    private readonly mailService: EmailService,
  ) {}

  generateRandomPassword(length: number) {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  async createToken(user: IUser) {
    let token = await sign(
      {
        email: user.email,
        role: user.role,
        _id: user._id,
        permission: user.permission,
      },
      this.secretKey,
      { expiresIn: '15m' },
    );
    return token;
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async signup(user: any): Promise<any> {
    try {
      let email = await this.userModel.find({ email: user.email });
      if (email[0]) {
        if (user.type == 'email') {
          return {
            status: 1,
            message: 'Email đã tồn tại',
          };
        } else {
          let data = await this.userModel.find({
            email: user.email,
            uid: user.uid,
          });
          let token = await this.createToken({
            email: data[0].email,
            role: data[0].role,
            _id: data[0]._id,
          });
          let refeshToken = await sign(
            {
              email: data[0].email,
              role: data[0].role,
              _id: data[0]._id,
            },
            this.secretKey,
          );
          return {
            status: 0,
            token,
            refeshToken,
            data,
          };
        }
      }
      if (user.type == 'email') {
        let password = this.generateRandomPassword(6);
        let mail = await this.mailService.sendMail(
          user.email,
          'Signup PassWord',
          password,
          'signup',
        );
        if (!mail) {
          return {
            status: 1,
            message: 'Gửi Email thất bại',
          };
        }
        password = await this.hashPassword(password);

        const data: any = await this.userModel.create({
          ...user,
          password,
          image: { url: '', public_id: '' },
        });
        if (Object.keys(data)[0]) {
        }
        await this.walletModel.create({ user_id: data._id, balance: 0 });
        return {
          status: 0,
          message: 'Tạo người dùng thành công',
          data,
        };
      } else {
        delete user.type;
        const data = await this.userModel.create({
          ...user,
          image: { url: '', public_id: '' },
        });
        if (Object.keys(data)[0]) {
        }
        await this.walletModel.create({ user_id: data._id, balance: 0 });
        let token = await this.createToken({
          email: data.email,
          role: data.role,
          _id: data._id,
        });
        let refeshToken = await sign(
          {
            email: data.email,
            role: data.role,
            _id: data._id,
          },
          this.secretKey,
        );
        return {
          status: 0,
          token,
          refeshToken,
          data: [data],
        };
      }
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  async create(user: IUser): Promise<any> {
    try {
      let email = await this.userModel.find({ email: user.email });
      if (email[0]) {
        return {
          status: 1,
          message: 'Email đã tồn tại',
        };
      }
      let password = this.generateRandomPassword(6);
      let mail = await this.mailService.sendMail(
        'toanbvph30125@fpt.edu.vn',
        'Signup PassWord',
        password,
        'signup',
      );
      if (!mail) {
        return {
          status: 1,
          message: 'Gửi Email thất bại',
        };
      }
      password = await this.hashPassword(password);

      const data = new this.userModel({ ...user, password }).save();

      return {
        status: 0,
        message: 'Tạo người dùng thành công',
        data,
      };
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  async signin(user: IUser) {
    try {
      let data = await this.userModel.find({ email: user.email });

      if (!data[0]) {
        return {
          status: 1,
          message: 'Email không tồn tại',
        };
      }
      let password = await bcrypt.compare(user.password, data[0].password);

      if (!password) {
        return {
          status: 1,
          message: 'Mật khẩu sai',
        };
      }

      let token = await this.createToken({
        email: data[0].email,
        role: data[0].role,
        _id: data[0]._id,
      });
      let refeshToken = await sign(
        {
          email: data[0].email,
          role: data[0].role,
          _id: data[0]._id,
        },
        this.secretKey,
      );
      data[0].password = null;
      return {
        status: 0,
        token,
        refeshToken,
        data,
      };
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  async refeshtoken(token: string) {
    try {
      console.log(token);
      const data: any = await verify(token, this.secretKey);
      const datanew = await this.userModel.findById(data._id);
      console.log(datanew);
      if (data) {
        const newdata = {
          email: datanew.email,
          role: datanew.role,
          _id: datanew._id,
        };
        const accessToken = await this.createToken(newdata);

        return {
          status: 0,
          message: 'token refesh',
          accessToken: accessToken,
          datanew: datanew,
        };
      }
    } catch (error) {
      return {
        status: 1,
        message: error.message,
      };
    }
  }
  async fillAllUser() {
    try {
      let data = await this.userModel.find();

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
  async findCountUser() {
    try {
      const data = await this.userModel.countDocuments();

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
  async otpEmail(email: any) {
    try {
      let data = await this.userModel.find({ email: email });
      if (!data[0]) {
        return {
          status: 1,
          message: 'Email không tồn tại',
        };
      }
      let password = this.generateRandomPassword(6);
      let mail = await this.mailService.sendMail(
        email,
        'Mã OTP',
        password,
        'signup',
      );
      if (!mail) {
        return {
          status: 1,
          message: 'Gửi Email thất bại',
        };
      }
      const otp = await sign(
        {
          password: password,
        },
        this.secretKey,
        { expiresIn: '1d' },
      );
      return {
        status: 0,
        message: 'Bạn vào Email lấy mã OTP',
        otp: otp,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async fillSearchUser(email: any) {
    try {
      let data = await this.userModel.find({ email: email });

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
  async changePassword(value: any) {
    try {
      let data = await this.userModel.find({ email: value.email });
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      let check_password = await bcrypt.compare(
        value.password,
        data[0].password,
      );
      if (!check_password) {
        return {
          status: 1,
          message: 'Mật khẩu cũ bạn nhập sai.',
        };
      }
      let password = await this.hashPassword(value.password_new);
      let data_new = await this.userModel.findOneAndUpdate(
        { _id: data[0]._id },
        { $set: { password: password } },
        { returnOriginal: false },
      );
      return {
        status: 0,
        message: 'suceess',
        data: data_new,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async forgotPassword(value: any) {
    try {
      let data = await this.userModel.find({ email: value.email });
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      let password = await this.hashPassword(value.passwordNew);
      let data_new = await this.userModel.findOneAndUpdate(
        { _id: data[0]._id },
        { $set: { password: password } },
        { returnOriginal: false },
      );
      return {
        status: 0,
        message: 'suceess',
        data: data_new,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteUser(id: string) {
    try {
      let data = await this.userModel.findByIdAndDelete(id);
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
  async updateUser(id: string, user: IUser) {
    try {
      let data = await this.userModel.findByIdAndUpdate(id, user, {
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
  async updateProfileUser(id: string, user: any) {
    try {
      let data: any;
      if (user.type == 'name') {
        data = await this.userModel.findOneAndUpdate(
          { _id: id },
          { $set: { user_name: user.body.user_name } },
          { returnOriginal: false },
        );
      } else {
        data = await this.userModel.findOneAndUpdate(
          { _id: id },
          { $set: { image: user.body.image } },
          { returnOriginal: false },
        );
      }

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
}
