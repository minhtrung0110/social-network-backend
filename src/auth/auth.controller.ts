import { Body, Controller, Get, Post, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, CreateUserDTO } from './dto/auth.dto';
import { GoogleGuard } from './guard/google.guard';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('register') //register a new user
  register(@Body() createDTO: CreateUserDTO) {
    //not validate using class-validator AND class-transformer
    // console.log('register', createDTO);
    return this.authService.register(createDTO);
  }

  @Post('login')
  login(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }

  @UseGuards(GoogleGuard)
  @Get('google')
  handlerLogin(@Req() req: Request) {
    return this.authService.handlerLogin();
  }

  @UseGuards(GoogleGuard)
  @Get('google/redirect')
  @Redirect('http://localhost:3000/auth/google', 302)
  async handlerRedirect(@Req() req: Request) {
    const userAuth = req.user;
    const data = await this.authService.loginWithoutPassword(userAuth as Omit<AuthDTO, 'password'>);
    const accessToken = data?.accessToken ?? '';
    return { url: `http://localhost:3000/api/auth/google/${accessToken}` };
  }

  @Get('status')
  user(@Req() req: Request) {
    if (req.user) {
      return { message: 'Authenticated', user: req.user };
    } else {
      return { message: 'Not Authenticated' };
    }
  }

  @Get('register/confirm')
  verifyAccount(@Req() req: Request) {
    const { query } = req;
    //console.log('Query', query);
    return this.authService.verifyEmail(query);
  }

  @Post('logout')
  logout(@Req() request: Request) {
    const { headers } = request;
    return this.authService.logout(headers.authorization);
  }

  @Post('verify-session')
  verifySession(@Req() request: Request) {
    const { headers } = request;
    return this.authService.checkExistSession(headers.authorization);
  }

  @Post('renewal-session')
  renewSession(@Req() request: Request) {
    //const timezoneOffset = new Date().getTimezoneOffset();
    //(timezoneOffset);
    const { headers } = request;
    return this.authService.renewSession(headers.authorization);
  }
}
