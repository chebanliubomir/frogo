import { ApiProperty } from "@nestjs/swagger";
import { Role, User } from "@prisma/generated";
import { Exclude } from "class-transformer";

export class UserEntity implements User {

  constructor(partial: Partial<UserEntity>) {
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
  @Exclude()
  password: string

  @ApiProperty()
  resetPasswordLink: string | null

  @ApiProperty()
  isActivated: boolean

  @ApiProperty()
  activatedLink: string | null

  @ApiProperty()
  role: Role

  @ApiProperty()
  created_at: Date
  
  @ApiProperty()
  updated_at: Date
}
