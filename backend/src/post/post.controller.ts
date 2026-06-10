import 'multer';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './utils/file-name.utils';
import { imageFileFilter } from './utils/file-filter.utils';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  @UseInterceptors(FileInterceptor('presentation', {
    storage: diskStorage({
      destination: './uploads/',
      filename: editFileName
    }),
    // fileFilter: imageFileFilter
  }))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() presentation: Express.Multer.File
  ) {
    return this.postService.create(createPostDto, presentation);
  }

  @Get('post/:id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto)
  }

  @Delete('remove/:id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id)
  }
}
