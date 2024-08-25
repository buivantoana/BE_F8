import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { MongodbConnect } from './connect/mongodb.module';

import { MailModule } from './mail/mail.module';
import { PostModule } from './post/post.module';
import { VnpayModule } from './vnpay/vnpay.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role_permission/role_permission.module';
import { CoursesModule } from './courses/courses.module';
import { LessonModule } from './lesson/lesson.module';
import { SublessonModule } from './sublesson/sublesson.module';
import { CategoriesModule } from './categories/categories.module';
import { ProgressModule } from './progress/progress.module';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OrdersModule } from './order/order.module';
import { CommentsModule } from './comments/comments.module';
import { noteModule } from './note/note.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionsModule } from './transactions/transactions.module';
import { NotifyModule } from './notify/notify.module';
import { ContactModule } from './contact/contact.module';
import { StarModule } from './star/star.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { UserVouchersModule } from './user_vouchers/user_vouchers.module';
import { VietQrModule } from './vietqr/vietqr.module';
import { TwilioModule } from './otp/otp.module';

@Module({
  imports: [
    MongodbConnect,
    UserModule,
    MailModule,
    PostModule,
    VnpayModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    CoursesModule,
    LessonModule,
    SublessonModule,
    CategoriesModule,
    ProgressModule,
    CloudinaryModule,
    OrdersModule,
    CommentsModule,
    noteModule,
    WalletModule,
    TransactionsModule,
    NotifyModule,
    ContactModule,
    StarModule,
    VouchersModule,
    UserVouchersModule,
    VietQrModule,
    TwilioModule,
  ],
})
export class AppModule {}
