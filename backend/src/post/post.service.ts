import { BadRequestException, Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ExtractorService } from '@/extractor/extractor.service'
@Injectable()
export class PostService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly extractorService: ExtractorService
  ) { }

  async create(createPostDto: CreatePostDto, presentation: Express.Multer.File, userId: number) {

    const file = await this.extractorService.extract('../../../uploads/backend/uploads/Minecraft- автоматизація Р-a494fd9d-a124-4b72-acf0-68400867af55.pptx')
    console.log(file)

    const createPost = await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        description: createPostDto.description,
        userId: userId
      }
    })

    const createPresentation = await this.prismaService.presentation.create({
      data: {
        name: presentation.filename,
        weight: presentation.size,
        postId: createPost.id
      }
    })


    return {
      ...createPost,
      presentation: createPresentation
    }

  }

  async getOne(id: number) {
    const post = await this.prismaService.post.findUnique({ where: { id } })
    if (!post) {
      throw new BadRequestException()
    }

    const presentation = await this.prismaService.presentation.findUnique({ where: { postId: post.id } })

    return {
      ...post,
      presentation
    }

  }

  async update(id: number, updatePostDto: UpdatePostDto) {

    if (!updatePostDto) {
      throw new BadRequestException()
    }

    const updatePost = await this.prismaService.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        description: updatePostDto.description
      }
    })

    return updatePost

  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException()
    }

    await this.prismaService.presentation.delete({ where: { postId: id} })
    await this.prismaService.post.delete({ where: { id } })


    return 'Post was remove.'
  }
}
