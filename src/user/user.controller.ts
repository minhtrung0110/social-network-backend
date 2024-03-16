import { Controller, Get, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor() {}
  //path : .../users/me
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(MyJwtGuard) //you can also make your own "decorator"
  @Get('me')
  me(@GetUser() user: User) {
    //console.log(request.user) //where is it come from ?
    return user;
  }
}
