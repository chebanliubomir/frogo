import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get list all users' })
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

}
