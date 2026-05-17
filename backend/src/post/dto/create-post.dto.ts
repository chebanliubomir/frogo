import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '0' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'test title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'test description' })
  description: string;

  @ApiProperty()
  files: Express.Multer.File
}
