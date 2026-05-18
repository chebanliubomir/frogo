import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  
  async create(post: CreatePostDto, file: Express.Multer.File) {
    console.log(post)
    console.log(file)
    return 'The post was received';
  }

  async update() {}

  async remove() {}

  async getOne() {}

  async getAll() {}

}
