import { User } from "@prisma/generated"
import { Request } from "express"


export interface CastomRequest extends Request {
  user: User
}
