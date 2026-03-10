import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({default: 'Dmitriy'})
  name: string

  @ApiProperty({default: 'Petrov'})
  surname: string

  @ApiProperty({default: 'qwerty@gmail.com'})
  email: string

  @ApiProperty({default: 'FcemD#orpfo#@#EmqQWEM'})
  password: string
}
