import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    MulterModule.register({
      dest: '../upload'
    }),
    PrismaModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
