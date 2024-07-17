import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
  } from 'class-validator';
  
  export class CoursesDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    readonly image: any;
    @IsString()
    readonly instructor: string;
    @IsNumber()
    readonly price: number;
    @IsNumber()
    readonly rating: number;
    @IsArray()
    readonly category_id: [string];
    @IsArray()
    readonly students: [string];
    @IsArray()
    readonly lesson: [string];
    @IsArray()
    readonly result_courses: [string];
    @IsArray()
    readonly courses_requirements: [string];
  }
  export class CoursesDtoUpdate {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    readonly image: any;
    @IsString()
    readonly instructor: string;
    @IsNumber()
    readonly price: number;
    @IsArray()
    readonly category_id: [string];
    @IsArray()
    readonly result_courses: [string];
    @IsArray()
    readonly courses_requirements: [string];
  }
  
  export class idCoursesDto {
    readonly id: string;
  }
  