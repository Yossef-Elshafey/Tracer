import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsBoolean()
  done: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  title: string;
}
