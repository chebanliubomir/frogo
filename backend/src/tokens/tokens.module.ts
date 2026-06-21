import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { TokensService } from './tokens.service'

import { PrismaService } from '@/prisma/prisma.service'

@Module({
  imports: [ConfigModule],
  providers: [TokensService, PrismaService],
  exports: [TokensService]
})
export class TokensModule {}
