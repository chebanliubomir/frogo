import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaService } from '@/prisma/prisma.service'

import { TokensService } from './tokens.service'
@Module({
  imports: [ConfigModule],
  providers: [TokensService, PrismaService],
  exports: [TokensService]
})
export class TokensModule {}
