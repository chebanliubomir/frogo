import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient {}
