import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('Post ')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @ApiBody({ type: CreatePostDto })
  @ApiOperation({ summary: 'Create post' })
  @Post('create')
  async create(@Body() post: CreatePostDto) {
    return this.postService.create(post);
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
