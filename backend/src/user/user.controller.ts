import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UserService } from './user.service.js';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity.js';
@Controller('user')
@ApiTags('User')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: UserEntity })
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers()
  }

}
