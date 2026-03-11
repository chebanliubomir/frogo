import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
