import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/user.decorator';
import { UserService } from './user.service';
import { Request } from 'express';
import { UserUpdateDTO } from './dto/user.dto';

@Controller('user')
@UseGuards(MyJwtGuard)
export class UserController {
  constructor(private userService: UserService) {}
  //path : .../users/me
  //@UseGuards(AuthGuard('jwt'))
  //you can also make your own "decorator"
  @Get('me')
  // @GetUser() is a custom decorator
  me(@GetUser() user: User) {
    return user;
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }
  @Get()
  findUserWithConditions(@Req() request: Request) {
    const { query } = request;
    return this.userService.getByCondition(query);
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: UserUpdateDTO) {
    return this.userService.updateUser(Number(id), user);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
