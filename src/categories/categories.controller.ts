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
  UseGuards,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { CategoriesService } from './categories.service';
import { CategoriesDto, idCategoriesDto } from './dto/categories.dto';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { Roles } from 'src/guards/role.decorator';

@Controller('categories')
 @UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Post('')
  @Roles('create_category')
  async createCategories(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    category: CategoriesDto,
  ) {
    try {
      return await this.categoriesService.createCategories(category);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  @Roles('edit_category')
  async updateCategories(
    @Param('id', new ValidationPipe({ transform: true })) id: idCategoriesDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    category: CategoriesDto,
  ) {
    try {
      return await this.categoriesService.updateCategories(
        String(id),
        category,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  @Roles('delete_category')
  async deleteCategories(
    @Param('id', new ValidationPipe({ transform: true })) id: idCategoriesDto,
  ) {
    try {
      return await this.categoriesService.deleteCategories(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllCategories() {
    try {
      return await this.categoriesService.findAllCategories();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('courses')
  async findAllCategoriesCourses() {
    try {
      return await this.categoriesService.findAllCategoriesWithCourses();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneCategories(
    @Param('id', new ValidationPipe({ transform: true })) id: idCategoriesDto,
  ) {
    try {
      return await this.categoriesService.findOneCategories(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
