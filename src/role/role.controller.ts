import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    ValidationPipe,
  } from '@nestjs/common';
  import { RoleService } from './role.service';
  import { RoleDto, idRoleDto } from './dto/role.dto';
  
  
  @Controller('role')
  export class RoleController {
    constructor(private roleService: RoleService) {}
    @Post('')
    async createFood(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      role: RoleDto,
    ) {
      try {
        return await this.roleService.createRole(role);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Put(':id')
    async updateFood(
      @Param('id', new ValidationPipe({ transform: true })) id: idRoleDto,
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      role: RoleDto,
    ) {
      try {
        return await this.roleService.updateRole(String(id), role);
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Delete(':id')
    async deleteFood(
      @Param('id', new ValidationPipe({ transform: true })) id: idRoleDto,
    ) {
      try {
        return await this.roleService.deleteRole(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get('')
    async fillAllFood() {
      try {
        return await this.roleService.fillAllRole();
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
    @Get(':id')
    async fillOneFood(
      @Param('id', new ValidationPipe({ transform: true })) id: idRoleDto,
    ) {
      try {
        return await this.roleService.fillOneRole(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
  }
  