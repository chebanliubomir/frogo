import { ApiProperty } from "@nestjs/swagger";
import { Role, User } from "../../../prisma/generated/prisma/client";

export class UserEntity implements User {

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
  password: string

  @ApiProperty({default: Role.USER})
  rule: Role

  @ApiProperty()
  activatedLink: string

  @ApiProperty()
  updated_at: Date

  @ApiProperty()
  created_at: Date

}
