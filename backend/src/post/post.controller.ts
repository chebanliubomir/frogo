import { Body, Controller, Delete, Get, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePostDto })
  @ApiOperation({ summary: 'Create post' })
  @Post('create')
  @UseInterceptors(FileInterceptor('files'))
  async create(
    @Body() post: CreatePostDto,
    @UploadedFiles() files
  ) {
    console.log(files)
    // const { title, description, userId } = post
    // return this.postService.create({ title, description, userId });
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
