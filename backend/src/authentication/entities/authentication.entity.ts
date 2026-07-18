import { ApiProperty } from "@nestjs/swagger"
import { Role, User } from "@prisma/generated"
import { Exclude } from 'class-transformer';

export class AuthenticationEntity implements User {
  constructor(partial: Partial<AuthenticationEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  id: number

  @ApiProperty()
  avatar: string

  @ApiProperty()
  name: string

  @ApiProperty()
  surname: string

  @ApiProperty()
  email: string

  @ApiProperty()
  activatedLink: string | null

  @ApiProperty()
  @Exclude()
  resetPasswordLink: string | null

  @ApiProperty()
  isActivated: boolean

  @ApiProperty()
  @Exclude()
  password: string

  @ApiProperty()
  role: Role

  @ApiProperty()
  updated_at: Date

  @ApiProperty()
  created_at: Date
}
