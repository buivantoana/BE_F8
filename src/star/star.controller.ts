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
  import { StarService } from './star.service';
  import { StarDto, idStarDto } from './dto/star.dto';
  
  @Controller('star')
  export class StarController {
    constructor(private StarService: StarService) {}
    @Post('')
    async createStar(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      star: StarDto,
    ) {
      try {
        return await this.StarService.createStar(star);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Put(':id')
    async updateStar(
      @Param('id', new ValidationPipe({ transform: true })) id: idStarDto,
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      star: StarDto,
    ) {
      try {
        return await this.StarService.updateStar(String(id), star);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Delete(':id')
    async deleteStar(
      @Param('id', new ValidationPipe({ transform: true })) id: idStarDto,
    ) {
      try {
        return await this.StarService.deleteStar(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
  
    @Get(':id/:type')
    async findCoursesStar(
      @Param('id', new ValidationPipe({ transform: true })) id: idStarDto,
      @Param('type', new ValidationPipe({ transform: true })) type: idStarDto,
    ) {
      try {
        return await this.StarService.findCoursesStar(String(id), type);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    
  }
  