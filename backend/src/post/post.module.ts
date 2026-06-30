import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'

import { PostController } from './post.controller'
import { PostService } from './post.service'

import { ExtractionModule } from '@/extraction/extraction.module'
import { ExtractionService } from '@/extraction/extraction.service'
import { PrismaService } from '@/prisma/prisma.service'
import { TokensService } from '@/tokens/tokens.service'
import { UserService } from '@/user/user.service'


@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/',
    }),
    ExtractionModule
  ],
  controllers: [PostController],
  providers: [PostService, TokensService, PrismaService, UserService, ExtractionService],
})
export class PostModule {}
