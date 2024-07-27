import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
    ValidationPipe,
  } from '@nestjs/common';
  import { PostService } from './post.service';
  import { PostDto, idPostDto } from './dto/post.dto';
  import { Request, Response } from 'express';
  import { JwtAuthGuard } from 'src/guards/auth.guards';
  import { Roles } from 'src/guards/role.decorator';
  @Controller('post')
  @UseGuards(JwtAuthGuard)
  export class PostController {
    constructor(private postService: PostService) {}
    @Post('')
    async createPost(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      post: PostDto,
    ) {
      try {
        return await this.postService.createPost(post);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Post('likes/:id/:user_id')
    async likePost(
      @Param('id', new ValidationPipe({ transform: true })) id: idPostDto,
      @Param('user_id', new ValidationPipe({ transform: true })) user_id: idPostDto,
    ) {
      try {
        return await this.postService.likesPost(String(id),user_id);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Put(':id')
    async updatePost(
      @Param('id', new ValidationPipe({ transform: true })) id: idPostDto,
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      post: PostDto,
    ) {
      try {
        return await this.postService.updatePost(String(id), post);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Put('active/:id')
    @Roles('edit_article')
    async updateActivePost(
      @Param('id', new ValidationPipe({ transform: true })) id: idPostDto,
    ) {
      try {
        return await this.postService.updateActivePost(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get('active')
    async getActivePost(
      @Req() req: Request
    ) {
      try {
        return await this.postService.findPaginationPostActive(req);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get('user/:id')
    async getUserPost(
      @Param('id', new ValidationPipe({ transform: true })) id: idPostDto,
    ) {
      try {
        return await this.postService.findAllUserPost(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
   
    @Get('')
    async fillAllPost() {
      try {
        return await this.postService.fillAllPost();
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get(':id')
  async fillOnePost(
    @Param('id', new ValidationPipe({ transform: true })) id: idPostDto,
  ) {
    try {
      return await this.postService.fillOnePost(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  }
  