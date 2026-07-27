import 'multer'

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Role } from '@prisma/generated'

import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostService } from './post.service'
import { fileFilter, presentationStorage } from './utils/storage'

import { AuthenticationGuard } from '@/authentication/guards/authentication.guard'
import { UserId } from '@/user/decorator/user-id.decorator'
import { UserRoles } from '@/user/decorator/user-roles.decorator'
import { UserRolesGuard } from '@/user/guards/user-roles.guard'
@ApiTags('Post')
@Controller('post')
@ApiBearerAuth()
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  @UserRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  @ApiOperation({ summary: 'Create post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePostDto })
  @UseInterceptors(FileInterceptor('presentation', { storage: presentationStorage, fileFilter: fileFilter }))
  create(
    @UserId('id') userId: number,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() presentation: Express.Multer.File
  ) {
    return this.postService.create(userId, createPostDto, presentation)
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all post' })
  getAll() {
    return this.postService.getAll()
  }

  @Get('one/:id')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Get one post by postId' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getOne(id)
  }

  @Patch('update/:id')
  @UserRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  @ApiOperation({ summary: 'Update post by postId' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postService.update(id, updatePostDto)
  }

  @Delete('remove/:id')
  @UserRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  @ApiOperation({ summary: 'Remove post by postId' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id)
  }
}
