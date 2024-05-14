import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { UserNameUpdateDTO, UserUpdateDTO } from './dto/user.dto';

@Controller('user')
@UseGuards(MyJwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  //path : .../users/me
  //@UseGuards(AuthGuard('jwt'))
  //you can also make your own "decorator"
  @Get('me')
  getAccount(@Req() request: Request) {
    const { headers } = request;
    return this.userService.getUserByToken(headers.authorization);
  }

  // // @GetUser() is a custom decorator
  // me(@GetUser() user: User) {
  //   return user;
  // }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Get()
  findUserWithConditions(@Req() request: Request) {
    const { query } = request;
    return this.userService.getByCondition(query);
  }

  @Get('profile/:id')
  getProfileUser(@Param('id') id: string) {
    return this.userService.getProfileUserById(Number(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: UserUpdateDTO) {
    //console.log('update user', user);
    const result = this.userService.updateUser(Number(id), user);
    //console.log('Check result:', result);
    return result;
  }

  @Patch('username/:id')
  updateUserName(@Param('id') id: string, @Body() username: UserNameUpdateDTO) {
    return this.userService.updateUserName(Number(id), username);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  /* MORE FEARS */
  @Get('posts')
  getRelatedPost(@Body() data: { userId: number }) {}
}
