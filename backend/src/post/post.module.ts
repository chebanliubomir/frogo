import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostService } from './post.service';

import { PrismaModule } from '@/prisma/prisma.module';
import { TokensModule } from '@/tokens/tokens.module';
import { UserModule } from '@/user/user.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [UserModule, TokensModule, PrismaModule]
})
export class PostModule {}
