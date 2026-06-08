import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Test post title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Test post description' })
  description: string;
}
