import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto {

  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(3)
  @ApiProperty({ default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' })
  description: string

}
