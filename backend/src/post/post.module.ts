import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'

import { PostController } from './post.controller'
import { PostService } from './post.service'

import { PrismaService } from '@/prisma/prisma.service'
import { TokensService } from '@/tokens/tokens.service'
import { UserService } from '@/user/user.service'


@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/',
    }),
  ],
  controllers: [PostController],
  providers: [PostService, TokensService, PrismaService, UserService],
})
export class PostModule {}
