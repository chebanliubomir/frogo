import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable } from '@nestjs/common';
import { env } from '@prisma/config'
import { PrismaClient } from '../../prisma/generated/prisma/client.js';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({ connectionString: env("DATABASE_URL") })
    console.log(adapter)
    super({ adapter })
  }
}
