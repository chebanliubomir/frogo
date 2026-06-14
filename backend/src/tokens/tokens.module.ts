import { Module } from '@nestjs/common'
import { TokensService } from './tokens.service'
import { PrismaService } from '@/prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [ConfigModule],
  providers: [TokensService, PrismaService],
  exports: [TokensService]
})
export class TokensModule {}
