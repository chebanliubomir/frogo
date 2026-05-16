import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  
  async create(post: CreatePostDto) {
    return 'The post was received'
  }

  async update() {}

  async remove() {}

  async getOne() {}

  async getAll() {}

}
