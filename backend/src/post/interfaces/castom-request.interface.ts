import { Request } from "express"

import { User } from "@prisma/generated"

export interface CastomRequest extends Request {
  user: User
}
