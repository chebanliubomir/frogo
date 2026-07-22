import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Role } from '@prisma/generated'

import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostService } from './post.service'

import { AuthenticationGuard } from '@/authentication/guards/authentication.guard'
import { UserRoles } from '@/user/decorator/user-roles.decorator'
import { UserRolesGuard } from '@/user/guards/user-roles.guard'

@ApiTags('Post')
@Controller('post')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, UserRolesGuard)
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  @UserRoles(Role.ADMIN)
  @ApiOperation({ summary: 'Create post' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto)
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all post' })
  getAll() {
    return this.postService.getAll()
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one post by postId' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getOne(id)
  }

  @Patch('update/:id')
  @UserRoles(Role.ADMIN)
  @ApiOperation({ summary: 'Update post by postId' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postService.update(id, updatePostDto)
  }

  @Delete('remove/:id')
  @UserRoles(Role.ADMIN)
  @ApiOperation({ summary: 'Remove post by postId' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id)
  }
}
