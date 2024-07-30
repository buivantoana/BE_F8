import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactModel } from './schema/contact.schema';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MailModule } from 'src/mail/mail.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactModel },
    ]),
    MailModule,
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
