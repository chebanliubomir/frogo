import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'

import { ExtractorService } from '@/extractor/extractor.service'
import { PrismaService } from '@/prisma/prisma.service'
import { TokensService } from '@/tokens/tokens.service'
import { UserService } from '@/user/user.service'

import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/',
    }),
  ],
  controllers: [PostController],
  providers: [PostService, TokensService, PrismaService, UserService, ExtractorService],
})
export class PostModule {}
