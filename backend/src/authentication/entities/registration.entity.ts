import { ApiProperty } from "@nestjs/swagger";
import { Role, User } from "../../../prisma/generated/prisma/client.js";
import { Exclude } from 'class-transformer'

export class RegistrationEntity implements User {

  @ApiProperty()
  id: number

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  rule: Role;

  @ApiProperty()
  @Exclude()
  activatedLink: string;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  created_at: Date;
}
