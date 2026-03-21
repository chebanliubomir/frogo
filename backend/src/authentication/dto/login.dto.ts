import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginDto {

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'qwerty@gmail.com' })
  email: string

  @IsNotEmpty()
  @ApiProperty({ default: 'FcemD#orpfo#@#EmqQWEM' })
  password: string
}
