import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  title: string;
}
