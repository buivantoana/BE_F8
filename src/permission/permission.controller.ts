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
import { PermissionService } from './permission.service';
import { PermissionDto, idPermissionDto } from './dto/permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private perService: PermissionService) {}
  @Post('')
  async createPer(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    per: PermissionDto,
  ) {
    try {
      return await this.perService.createPermission(per);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updatePer(
    @Param('id', new ValidationPipe({ transform: true })) id: idPermissionDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    per: PermissionDto,
  ) {
    try {
      return await this.perService.updatePermission(String(id), per);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
    async deletePer(
      @Param('id', new ValidationPipe({ transform: true })) id: idPermissionDto,
    ) {
      try {
        return await this.perService.deletePermission(String(id));
      } catch (error) {
        return {
          status: 1,
          message: error,
        };
      }
    }
  @Get('')
  async fillAllPer() {
    try {
      return await this.perService.fillAllPermission();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async fillOnePer(
    @Param('id', new ValidationPipe({ transform: true })) id: idPermissionDto,
  ) {
    try {
      return await this.perService.fillOnePermission(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
