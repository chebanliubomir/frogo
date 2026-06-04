import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '@/authentication/guards/authentication.guard';
@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get list all users' })
  @UseGuards(AuthenticationGuard)
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

}
