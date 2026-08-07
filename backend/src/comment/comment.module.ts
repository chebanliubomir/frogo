import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TokensModule } from '@/tokens/tokens.module';
import { TokensService } from '@/tokens/tokens.service';
import { UserModule } from '@/user/user.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule, TokensModule],
  controllers: [CommentController],
  providers: [CommentService],
})

export class CommentModule {}
