import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from './schema/permission.schema';
import { IPermission } from './interface/permission.interface';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name) private readonly perModel: Model<Permission>,
  ) {}
  async createPermission(per: IPermission) {
    try {
      let data = await this.perModel.create(per);
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
