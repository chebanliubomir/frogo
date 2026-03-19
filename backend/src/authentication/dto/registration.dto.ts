import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Max, Min } from "class-validator"
export class RegistrationDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Dmitriy' })
  @Min(1)
  @Max(150)
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Petrov' })
  @Min(1)
  @Max(150)
  surname: string

  @IsEmail()
  @IsString()
  @ApiProperty({ default: 'qwerty@gmail.com' })
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'FcemD#orpfo#@#EmqQWEM' })
  password: string
}
