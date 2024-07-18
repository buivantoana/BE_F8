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
import { Request, Response } from 'express';
import { SigninDto, SignupDto, idUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { Roles } from 'src/guards/role.decorator';

@Controller('auth')
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signup')
  async signup(
    // @Res() res: Response,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    user: any,
  ) {
    try {
      return await this.userService.signup(user);
    } catch (error) {
      return {
        status: 1,
        message: 'create user faild',
        error,
      };
    }
  }
  @Post('create')
  async create(
    // @Res() res: Response,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    user: SignupDto,
  ) {
    try {
      return await this.userService.create(user);
    } catch (error) {
      return {
        status: 1,
        message: 'create user faild',
        error,
      };
    }
  }
  @Post('signin')
  async signin(
    // @Res() res: Response,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    user: SigninDto,
  ) {
    try {
      return await this.userService.signin(user);
    } catch (error) {
      return {
        status: 1,
        message: 'create user faild',
        error,
      };
    }
  }
  @Get('authentication')
  async authentication(@Req() req: Request, @Res() res: Response) {
    try {
      return res
        .status(200)
        .json({ status: 0, message: 'success', data: req.body.user });
    } catch (error) {}
  }
  @Get('refeshtoken')
  async refeshtoken(@Req() req: Request) {
    try {
      let token = req.headers.authorization.split(' ')[1];
      if (token) {
        return await this.userService.refeshtoken(token);
      }
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }

  @Get('')
  // @Roles('create_user')
  async fillAllUser() {
    try {
      return await this.userService.fillAllUser();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('count')
  // @Roles('create_user')
  async findCountUser() {
    try {
      return await this.userService.findCountUser();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('search/:email')
  // @Roles('create_user')
  async fillSearchUser(
    @Param('email', new ValidationPipe({ transform: true }))
    email: any,
  ) {
    try {
      return await this.userService.fillSearchUser(email);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  // @Roles('delete_user')
  async deleteUser(
    @Param('id', new ValidationPipe({ transform: true }))
    id: idUserDto,
  ) {
    try {
      return await this.userService.deleteUser(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateUser(
    @Param('id', new ValidationPipe({ transform: true }))
    id: idUserDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    user: any,
  ) {
    try {
      return await this.userService.updateUser(String(id), user);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put('change_password/user')
  async changePassword(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    user: any,
  ) {
    try {
      return await this.userService.changePassword(user);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
 
  @Post('otp_email/user')
  async otpEmail(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    user: any,
  ) {
    try {
      return await this.userService.otpEmail(user.email);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put('profile/:id')
  async updateProfileUser(
    @Param('id', new ValidationPipe({ transform: true }))
    id: idUserDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    user: any,
  ) {
    try {
      return await this.userService.updateProfileUser(String(id), user);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
