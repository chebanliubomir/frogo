import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  
  async create(post: CreatePostDto, file: Express.Multer.File) {
    console.log(post)
    console.log(file)
    return 'The post was received';
  }

  async update(post: CreatePostDto, file: Express.Multer.File) {
    console.log(post)
    console.log(file)
    return 'The updated post was received';
  }

  async remove(postId: number) {
    console.log(postId)
    return 'The post was removed';
  }

  async getOne(postId: number) {
    console.log(postId)
    return 'The post was getting';

  }

  async getAll() {
    return 'The posts was all getting';
  }

}
