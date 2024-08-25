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
import { RolePermissionService } from './role_permission.service';
import {
  RolePermissionDto,
  idRolePermissionDto,
} from './dto/role_permission.dto';

@Controller('role_permission')
export class RolePermissionController {
  constructor(private rolePermissionService: RolePermissionService) {}
  @Post('')
  async createFood(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    role: RolePermissionDto,
  ) {
    try {
      return await this.rolePermissionService.createRolePermission(role);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateFood(
    @Param('id', new ValidationPipe({ transform: true }))
    id: idRolePermissionDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    role: RolePermissionDto,
  ) {
    try {
      return await this.rolePermissionService.updateRolePermission(
        String(id),
        role,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteFood(
    @Param('id', new ValidationPipe({ transform: true }))
    id: idRolePermissionDto,
  ) {
    try {
      return await this.rolePermissionService.deleteRolePermission(String(id));
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
      return await this.rolePermissionService.fillAllRolePermission();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async fillOneFood(
    @Param('id', new ValidationPipe({ transform: true }))
    id: idRolePermissionDto,
  ) {
    try {
      return await this.rolePermissionService.fillOneRolePermission(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
