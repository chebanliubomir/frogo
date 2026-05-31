import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import "multer";
export class CreatePostDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  userId: string;

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
  file: Express.Multer.File;
}
