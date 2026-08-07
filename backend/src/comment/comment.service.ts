import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CommentService {

  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, postId: number, createCommentDto: CreateCommentDto) {
    const createCommentForPost = await this.prisma.comment.create({
      data: {
        userId: userId,
        postId: postId,
        text: createCommentDto.description
      } 
    })

    return createCommentForPost

  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
