import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { Courses } from 'src/courses/schema/courses.schema';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Progress extends Document {
  @Prop([
    {
      lesson_id: String,
      completed: Boolean,
      sub_lesson: [
        {
          sub_lesson_id: String,
          completed: Boolean,
          result: Boolean,
        },
      ],
    },
  ])
  lesson_progress: Array<{
    lesson_id: string;
    completed: boolean;
    sub_lesson: Array<{
      sub_lesson_id: string;
      completed: boolean;
      result: boolean;
    }>;
  }>;
  @Prop({ required: true })
  completed: boolean;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  user_id: User;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Courses' }] })
  courses_id: Courses;
  @Prop()
  user_name?: string;
  @Prop()
  date_certificate?: string;
  @Prop()
  status_certificate?: boolean;

}

export const ProgressModel = SchemaFactory.createForClass(Progress);
