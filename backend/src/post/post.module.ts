import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { MulterModule } from '@nestjs/platform-express'
import { TokensService } from '@/tokens/tokens.service'
import { PrismaService } from '@/prisma/prisma.service'
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
