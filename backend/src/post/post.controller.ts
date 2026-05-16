import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Post ')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({summary: 'Create post'})
  @Post('create')
  async create() {
    return this.postService.create()
  }

  @ApiOperation({summary: 'Update post'})
  @Patch('update')
  async update() {
    return this.postService.update()
  }

  @ApiOperation({summary: 'Remove post'})
  @Delete('remove')
  async remove() {
    return this.postService.remove()
  }

  @ApiOperation({summary: 'Get only one post'})
  @Get('get-one')
  async getOne() {
    return this.postService.getOne()
  }

  @ApiOperation({summary: 'Get all posts'})
  @Get('get-all')
  async getAll() {
    return this.postService.getAll()
  }

}
