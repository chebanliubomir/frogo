import { BadRequestException, Injectable } from '@nestjs/common';

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
        name: presentation[0].filename,
        weight: presentation[0].size,
        postId: createPost.id
      }
    })


    const filterImages = images.map(i => ({ name: i.filename, postId: createPost.id }))

    const createImagesForPost = await this.prisma.post_images.createManyAndReturn({
      data: filterImages
    })

    return {
      ...createPost,
      images: createImagesForPost,
      presentation: createPresentation
    }


  }

  async getAll() { }

  async getOne(id: number) {
    const findPost = await this.prisma.post.findFirst({ where: { id } })

    if(!findPost) {
      throw new BadRequestException('There is no such post')
    }

    const findPostImages = await this.prisma.post_images.findMany({where: {postId: findPost?.id}})

    return {
      ...findPost,
      images: findPostImages
    }

  }

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log(updatePostDto)
    return `This action updates a #${id} post`
  }

  remove(id: number) {
    return `This action removes a #${id} post`
  }
}
