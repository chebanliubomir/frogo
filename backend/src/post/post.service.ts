import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PostService {

  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto, presentation: Express.Multer.File, userId: number) {
    const createPost = await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        description: createPostDto.description,
        userId: userId
      }
    });

    return 'This action adds a new post';
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log(updatePostDto);
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
