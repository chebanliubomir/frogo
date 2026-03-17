import { Controller, Post, Body, Param, Get, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity.js';
@Controller('user')
@ApiTags('User')
export class UserController {

  constructor(private readonly userService: UserService) {}
  
  @ApiOkResponse({ type: UserEntity })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
  
  @ApiOkResponse({ type: UserEntity })
  @Get('one')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id)
  }

  @ApiOkResponse({ type: UserEntity })
  @Get('all')
  getAllUser() {
    return this.userService.getAllUser()
  }

}
