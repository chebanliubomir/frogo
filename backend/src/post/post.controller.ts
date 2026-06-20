import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req, ParseIntPipe } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'


import { AuthenticationGuard } from '@/authentication/guards/authentication.guard'
import { UserRoles } from '@/user/decorator/user-roles.decorator'
import { UserRolesGuard } from '@/user/guards/user-roles.guard'
import { Role } from '@prisma/generated'

import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { CastomRequest } from './interfaces/castom-request.interface'
import { PostService } from './post.service'
import { presentationFileFilter } from './utils/file-filter.utils'
import { editFileName } from './utils/file-name.utils'
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  @UserRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  @UseInterceptors(FileInterceptor('presentation', {
    storage: diskStorage({
      destination: './uploads/',
      filename: editFileName
    }),
    fileFilter: presentationFileFilter
  }))
  async create(
    @Req() req: CastomRequest,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() presentation: Express.Multer.File
  ) {
    const userId: number = req.user.id
    return await this.postService.create(createPostDto, presentation, userId)
  }

  @Get('post/:id')
  @UseGuards(AuthenticationGuard)
  async getOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id)
    return await this.postService.getOne(id)
  }

  @Patch('update/:id')
  @UserRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return await this.postService.update(id, updatePostDto)
  }

  @Delete('remove/:id')
  @UserRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, UserRolesGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.remove(id)
  }
}
