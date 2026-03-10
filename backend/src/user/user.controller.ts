import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
}
