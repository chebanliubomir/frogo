import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  create(userId: number, postId: number, createCommentDto: CreateCommentDto) {
    console.log(userId, postId, createCommentDto)
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
