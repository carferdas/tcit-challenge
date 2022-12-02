import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(20)
  description: string;
}
