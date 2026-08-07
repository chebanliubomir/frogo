import { Controller, Post, Body, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Role } from '@prisma/generated'

import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'

import { AuthenticationGuard } from '@/authentication/guards/authentication.guard'
import { UserId } from '@/user/decorator/user-id.decorator';
import { UserRoles } from '@/user/decorator/user-roles.decorator';
import { UserRolesGuard } from '@/user/guards/user-roles.guard'


ApiTags('Comment')
@Controller('comment')
@ApiBearerAuth()
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('create')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Create comment' })
  @ApiBody({ type: CreateCommentDto })
  create(
    @UserId('id') userId: number,
    @Query('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.commentService.create(userId, postId, createCommentDto)
  }

  @Delete('comment/:id')
  @UserRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  @ApiOperation({ summary: 'Remove comment' })
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.commentService.remove(id)
  }
}
