import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schema/contact.schema';
import { IContact } from './interface/contact.interface';
import { EmailService } from 'src/mail/mail.service';


@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<Contact>,
    private readonly mailService: EmailService,
  ) {}
  async createContact(contact: IContact) {
    try {
      let data = await this.contactModel.create({...contact,status:false});
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async updateContact(id: string,value:any) {
    try {
      let data = await this.contactModel.findOneAndUpdate(
        { _id: id },
        { $set: { status: true } },
        { returnOriginal: false },
      )
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      let mail = await this.mailService.sendMail(
        data.email,
        'Reply Contact',
        value,
        "contact"
      );
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  
  async findAllContact() {
    try {
      let data = await this.contactModel.find({status:false});

      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
