import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
  } from '@nestjs/common';
  
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
  import { CoursesService } from './courses.service';
  import { CoursesDto, CoursesDtoUpdate, idCoursesDto } from './dto/courses.dto';
  import { JwtAuthGuard } from 'src/guards/auth.guards';
  import { Roles } from 'src/guards/role.decorator';
  
  @Controller('courses')
  @UseGuards(JwtAuthGuard)
  export class CoursesController {
    constructor(
      private coursesService: CoursesService,
      private readonly cloudinaryService: CloudinaryService,
    ) {}
    @Post('')
    @Roles('create_courses')
    async createCourses(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      courses: CoursesDto,
    ) {
      try {
        return await this.coursesService.createCourses(courses);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
  
    @Put(':id')
    @Roles('edit_courses')
    async updateCourses(
      @Param('id', new ValidationPipe({ transform: true })) id: idCoursesDto,
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      courses: CoursesDtoUpdate,
    ) {
      try {
        return await this.coursesService.updateCourses(String(id), courses);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Put('arrange/:id')
    async updateArrangeCourses(
      @Param('id', new ValidationPipe({ transform: true })) id: idCoursesDto,
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      courses: any,
    ) {
      try {
        return await this.coursesService.updateArrangeCourses(String(id), courses);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Delete(':id')
    @Roles('delete_courses')
    async deleteCourses(
      @Param('id', new ValidationPipe({ transform: true })) id: idCoursesDto,
    ) {
      try {
        return await this.coursesService.deleteCourses(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get('')
    async findAllCourses() {
      try {
        return await this.coursesService.findAllCourses();
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get('search/:search')
    async searchCourses( @Param('search', new ValidationPipe({ transform: true })) search: idCoursesDto,) {
      try {
        return await this.coursesService.searchCourses(search);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get(':id')
    async findOneCourses(
      @Param('id', new ValidationPipe({ transform: true })) id: idCoursesDto,
    ) {
      try {
        return await this.coursesService.findOneCourses(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get('my_courses/:id')
    async findMyCourses(
      @Param('id', new ValidationPipe({ transform: true })) id: idCoursesDto,
    ) {
      try {
        return await this.coursesService.findMyCourses(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
  }
  