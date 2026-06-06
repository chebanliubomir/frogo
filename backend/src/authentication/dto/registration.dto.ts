import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class RegistrationDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Dmitriy' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Petrov' })
  surname: string;

  @IsEmail()
  @IsString()
  @ApiProperty({ default: 'qwqzx1485@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'FcemD#orpfo#@#EmqQWEM' })
  password: string;
}
