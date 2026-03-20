import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Max, Min } from "class-validator"
export class RegistrationDto {

  @Min(1)
  @Max(150)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Dmitriy' })
  name: string

  
  @Min(1)
  @Max(150)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Petrov' })
  surname: string

  @IsEmail()
  @IsString()
  @ApiProperty({ default: 'qwerty@gmail.com' })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'FcemD#orpfo#@#EmqQWEM' })
  password: string
}
