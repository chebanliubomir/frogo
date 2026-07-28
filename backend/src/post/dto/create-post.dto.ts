import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(3)
  @ApiProperty({default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'})
  title: string

  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(3)
  @ApiProperty({default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'})
  description: string

  @ApiProperty({ type: 'string', format: 'binary', description: 'Presentation' })
  presentation: Express.Multer.File

  @ApiProperty({ type: 'string', format: 'binary', description: 'Images' })
  images: Express.Multer.File

}
