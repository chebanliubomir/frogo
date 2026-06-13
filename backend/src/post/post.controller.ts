import 'multer';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './utils/file-name.utils';
import { presentationFileFilter } from './utils/file-filter.utils';
import { AuthenticationGuard } from '@/authentication/guards/authentication.guard';
import { UserRolesGuard } from '@/user/guards/user-roles.guard';
import { UserRoles } from '@/user/decorator/user-roles.decorator';
import { Role } from '@prisma/generated';
import { Request } from 'express';
import { CastomRequest } from './interfaces/castom-request.interface';
@Controller('post')
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
    return await this.postService.create(createPostDto, presentation, userId);
  }

  @Get('post/:id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
