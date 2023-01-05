import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signUp')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registerUser(createUserDto);
  }

  @Post('/signIn')
  LoginUser(@Body() loginUserdto: LoginUserDto) {
    return this.usersService.loginUser(loginUserdto);
  }
  @Get()
  fetchAllUser() {
    return this.usersService.findAllUsers();
  }
}
