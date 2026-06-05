import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '@/authentication/guards/authentication.guard';
import { Role } from '@prisma/generated';
import { UserRolesGuard } from './guards/user-roles.guard';
import { UserRoles } from './decorator/user-roles.decorator';
@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UserRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  @ApiOperation({ summary: 'Get list all users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

}
