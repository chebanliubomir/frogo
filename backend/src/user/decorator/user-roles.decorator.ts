import { Reflector } from "@nestjs/core"
import { Role } from "@prisma/generated"

export const UserRoles = Reflector.createDecorator<Role>()
