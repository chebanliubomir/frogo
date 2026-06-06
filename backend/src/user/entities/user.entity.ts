import { ApiProperty } from "@nestjs/swagger"
import { Role, User } from "@prisma/generated"
import { Exclude } from 'class-transformer';

export class UserEntity implements User {

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  isActivated: boolean;

  @ApiProperty()

  activatedLink: string | null;
  @ApiProperty()

  resetPasswordLink: string | null;
  @ApiProperty()

  rule: Role; 
  @ApiProperty()

  created_at: Date;
  @ApiProperty()

  updated_at: Date;
  @ApiProperty()
  
  @Exclude()
  @ApiProperty()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  
}
