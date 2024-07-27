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
import { CommentService } from './comments.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Put('report_dad')
  async reportDad(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    value: any,
  ) {
    try {
      return await this.commentService.reportCommentDad(value);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put('report_child')
  async reportChild(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    value: any,
  ) {
    try {
      return await this.commentService.reportCommentChild(value);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('get_report')
  async getReport(
  ) {
    try {
      return await this.commentService.findReportedComments();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteComment(
    @Param('id', new ValidationPipe({ transform: true })) id: any,
  ) {
    try {
      return await this.commentService.deleteComment(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete('comment_child/:id/:child')
  async deleteCommentChild(
    @Param('id', new ValidationPipe({ transform: true })) id: any,
    @Param('child', new ValidationPipe({ transform: true })) child: any,
  ) {
    try {
      return await this.commentService.deleteCommentChild(String(id),String(child));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
