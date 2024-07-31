import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schema/contact.schema';
import { IContact } from './interface/contact.interface';
import { EmailService } from 'src/mail/mail.service';
