import * as fs from 'fs'
import path from 'path'

import { BadRequestException, Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { PrismaService } from '@/prisma/prisma.service';
import { take } from 'rxjs';
import { SortOrder } from './enums/sort-order.enum';

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

  async getAll(page: number, limit: number, order: SortOrder) {
    const getAllPosts = await this.prisma.post.findMany({
      include: {
        post_images: true
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        created_at: order
      }
    })

    return getAllPosts.length === 0 ? { message: 'No posts' } : getAllPosts
  }

  async getOne(id: number) {
    const findPost = await this.prisma.post.findFirst({ where: { id }, include: { post_images: true } })

    if (!findPost) {
      throw new BadRequestException('There is no such post')
    }

    return findPost

  }

  async update(id: number, updatePostDto: UpdatePostDto, presentation: Express.Multer.File, images: Express.Multer.File[]) {
    const updatePost = await this.prisma.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        description: updatePostDto.description
      }
    })

    if (images) {
      const findImagesPost = await this.prisma.post_images.findMany({ where: { postId: id } })
      for (let i = 0; i < findImagesPost.length; i++) {
        const filePath = path.join(process.cwd(), 'uploads', findImagesPost[i].name);
        await fs.unlink(filePath, e => console.log('images', e))
      }
      await this.prisma.post_images.deleteMany({ where: { postId: id } })

      const filterImages = images.map(i => ({ name: i.filename, postId: id }))

      await this.prisma.post_images.createManyAndReturn({
        data: filterImages
      })
    }

    if (presentation) {
      const findPresentationPost = await this.prisma.presentation.findMany({ where: { postId: id } })
      const filePath = path.join(process.cwd(), 'uploads', findPresentationPost[0].name);

      await fs.unlink(filePath, e => console.log('presentation', e))

      await this.prisma.presentation.deleteMany({ where: { postId: id } })

      await this.prisma.presentation.create({
        data: {
          name: presentation[0].filename,
          weight: presentation[0].size,
          postId: id
        }
      })
    }

    const postImages = await this.prisma.post_images.findMany({ where: { postId: id } })
    const postPresentation = await this.prisma.presentation.findMany({ where: { postId: id } })

    return {
      ...updatePost,
      images: postImages,
      presentation: postPresentation
    }

  }

  async remove(id: number) {

    const findImagesPost = await this.prisma.post_images.findMany({ where: { postId: id } })
    for (let i = 0; i < findImagesPost.length; i++) {
      const filePath = path.join(process.cwd(), 'uploads', findImagesPost[i].name);
      await fs.unlink(filePath, e => console.log('remove images', e))
    }

    const findPresentationPost = await this.prisma.presentation.findMany({ where: { postId: id } })
    const filePath = path.join(process.cwd(), 'uploads', findPresentationPost[0].name);
    await fs.unlink(filePath, e => console.log('remove images', e))

    const [deletedImages, deletedPresentation, deletedPost] = await this.prisma.$transaction([
      this.prisma.post_images.deleteMany({ where: { postId: id } }),
      this.prisma.presentation.deleteMany({ where: { postId: id } }),
      this.prisma.post.deleteMany({ where: { id } })
    ])


    if (deletedPost.count === 0 || deletedPresentation.count === 0 || deletedImages.count === 0) {
      throw new BadRequestException('There is no such post')
    }

    return { deletedPostCount: deletedPost.count }
  }
}
