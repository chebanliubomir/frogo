import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from '@/prisma/prisma.service';
@Injectable()
export class PostService {

  constructor(private readonly prisma: PrismaService) { }

  async create(post: CreatePostDto, presentation: Express.Multer.File) {
    const { userId, title, description } = post;

    const createPost = await this.prisma.post.create({
      data: {
        userId: +userId,
        title,
        description
      }
    });

    await this.prisma.presentation.create({
      data: {
        name: '',
        weight: 0,
        sales: 0,
        postId: createPost.id
      }
    })

    return 'Presentation has been created';

  }

  async update(post: CreatePostDto, file: Express.Multer.File) {
    console.log('post', { ...post });
    console.log('file', file);
    return 'The post was updated.';
  }

  async remove(postId: number) {
    console.log(postId);
    return 'The post was removed';
  }

  async getOne(postId: number) {
    console.log(postId);
    return 'The post was getting';

  }

  async getAll() {
    return 'The posts was all getting';
  }

}
