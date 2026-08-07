import { Injectable } from '@nestjs/common';

import { CreateCommentDto } from './dto/create-comment.dto';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CommentService {

  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, postId: number, createCommentDto: CreateCommentDto) {
    return await this.prisma.comment.create({
      data: {
        userId: userId,
        postId: postId,
        text: createCommentDto.comment
      }
    })

  }

  async remove(commentId: number) {
    return await this.prisma.comment.delete({ where: { id: commentId } })
  }
}
