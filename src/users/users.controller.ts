import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from 'src/guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('check')
  checkAuth() {
    return 'OK';
  }
}
