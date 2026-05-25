import "multer"
import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Post')
@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService) { }

  @Post('create')
  @ApiBody({ type: CreatePostDto })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create post' })
  @UseInterceptors(FileInterceptor('file', {
    storage: {
      destination: '../uploads',
    }
  }))
  async create(
    @Body() post: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.create(post, file);
  }

  @ApiOperation({ summary: 'Update post' })
  @Patch('update')
  async update(
    @Body() post: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.update(post, file);
  }

  @ApiOperation({ summary: 'Remove post' })
  @Delete('remove')
  async remove(@Query('postId') postId: number) {
    return this.postService.remove(postId);
  }

  @ApiOperation({ summary: 'Get only one post' })
  @Get('get-one')
  async getOne(@Query('postId') postId: number) {
    return this.postService.getOne(postId);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @Get('get-all')
  async getAll() {
    return this.postService.getAll();
  }

}
