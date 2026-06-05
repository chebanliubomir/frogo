import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '@/authentication/guards/authentication.guard';
import { Role } from '@prisma/generated';
import { Roles } from './decorator/roles.decorator';
import { UserRolesGuard } from './guards/user-roles.guard';
@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get list all users' })
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

}
