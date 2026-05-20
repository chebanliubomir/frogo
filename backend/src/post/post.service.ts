import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from '@/prisma/prisma.service';
import uuid from 'uuid'
@Injectable()
export class PostService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(post: CreatePostDto, file: Express.Multer.File) {
    const { title, description } = post

    const createPost = await this.prisma.post.create({ data: {
      title,
      description,
      presentation,
    } })
}

  async update(post: CreatePostDto, file: Express.Multer.File) {
  const { userId, title, description } = post

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
