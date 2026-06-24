import type { User } from '@prisma/generated'
import type { Request } from 'express'


export interface CastomRequest extends Request {
  user: User
}
