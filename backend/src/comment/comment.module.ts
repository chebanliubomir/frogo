import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

import { PrismaModule } from '@/prisma/prisma.module';
import { TokensModule } from '@/tokens/tokens.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [PrismaModule, UserModule, TokensModule],
  controllers: [CommentController],
  providers: [CommentService],
})

export class CommentModule {}
