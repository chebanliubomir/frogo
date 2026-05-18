import { Body, Controller, Delete, Get, Patch, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import "multer"

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  @ApiBody({ type: CreatePostDto })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create post' })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() post: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.create(post, file);
  }

  @ApiOperation({ summary: 'Update post' })
  @Patch('update')
  async update() {
    return this.postService.update();
  }

  @ApiOperation({ summary: 'Remove post' })
  @Delete('remove')
  async remove() {
    return this.postService.remove();
  }

  @ApiOperation({ summary: 'Get only one post' })
  @Get('get-one')
  async getOne() {
    return this.postService.getOne();
  }

  @ApiOperation({ summary: 'Get all posts' })
  @Get('get-all')
  async getAll() {
    return this.postService.getAll();
  }

}
