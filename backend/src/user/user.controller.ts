import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    const { name, surname, email,password } = createUserDto
    console.log(name)
    return this.userService.create()
  }
}
