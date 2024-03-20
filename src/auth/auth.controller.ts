import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, CreateUserDTO } from './dto/auth.dto';
import { GoogleGuard } from './guard/google.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') //register a new user
  register(@Body() createDTO: CreateUserDTO) {
    //not validate using class-validator AND class-transformer
    console.log('register', createDTO);
    return this.authService.register(createDTO);
  }
  @Post('login')
  login(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }

  @UseGuards(GoogleGuard)
  @Get('google')
  handlerLogin() {
    return this.authService.handlerLogin();
  }

  @UseGuards(GoogleGuard)
  @Get('google/redirect')
  handlerRedirect() {
    return this.authService.handlerRedirect();
  }

  @Get('status')
  user(@Req() req: Request) {
    if (req.user) {
      return { message: 'Authenticated', user: req.user };
    } else {
      return { message: 'Not Authenticated' };
    }
  }
}
