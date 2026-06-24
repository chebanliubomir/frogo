import { Reflector } from '@nestjs/core'

import type { Role } from '@prisma/generated'

export const UserRoles = Reflector.createDecorator<Role>()
