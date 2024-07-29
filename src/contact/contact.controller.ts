import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  ValidationPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { ContactService } from './contact.service';
import { ContactDto, idContactDto } from './dto/contact.dto';


@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}
  @Post('')
  async createContact(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    contact: ContactDto,
  ) {
    try {
      return await this.contactService.createContact(contact);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateContact(
    @Param('id', new ValidationPipe({ transform: true })) id: idContactDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    contact: any,
  ) {
    try {
      return await this.contactService.updateContact(
        String(id),
        contact.reply
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
 
  @Get('')
  async findAllContact() {
    try {
      return await this.contactService.findAllContact();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
 
 
}
