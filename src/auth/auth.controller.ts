import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, CreateUserDTO } from './dto/auth.dto';

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
}
