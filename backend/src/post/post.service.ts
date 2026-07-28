import { Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PostService {

  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, createPostDto: CreatePostDto, presentation: Express.Multer.File, images: Express.Multer.File[]) {
    const createPost = await this.prisma.post.create({
      data: {
        userId: userId,
        title: createPostDto.title,
        description: createPostDto.description
      }
    })
    
    const createPresentation = await this.prisma.presentation.create({
      data: {
        name: presentation.filename,
        weight: presentation.size,
        postId: createPost.id
      }
    })

    console.log(images)

    const createImagesForPost = await this.prisma.post_images.createMany({
      data: [
      ]
    })

    return {
      ...createPost,
      presentation: createPresentation
    }


  }

  getAll() {
    return 'This action returns all post'
  }

  getOne(id: number) {
    return `This action returns a #${id} post`
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log(updatePostDto)
    return `This action updates a #${id} post`
  }

  remove(id: number) {
    return `This action removes a #${id} post`
  }
}
