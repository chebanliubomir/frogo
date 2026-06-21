import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Role } from '@prisma/generated'

import { UserRoles } from './decorator/user-roles.decorator'
import { UserEntity } from './entities/user.entity'
import { UserRolesGuard } from './guards/user-roles.guard'
import { UserService } from './user.service'

import { AuthenticationGuard } from '@/authentication/guards/authentication.guard'
@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get('all')
  @UserRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  @ApiOperation({ summary: 'Get list all users' })
  @ApiOkResponse({ type: UserEntity })
  @UseInterceptors(ClassSerializerInterceptor)
  getAllUsers() {
    return this.userService.getAllUsers()
  }

}
