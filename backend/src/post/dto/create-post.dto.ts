import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import "multer"
export class CreatePostDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'test title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'test description' })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'upload presentation',
  })
  file: Express.Multer.File
}
