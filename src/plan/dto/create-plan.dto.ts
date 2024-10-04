import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { isBeforeToday } from 'src/common/custom.validators';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  plan: string;

  @IsNumber()
  @IsNotEmpty()
  steps: number;

  @IsNotEmpty()
  @Type(() => Date)
  @Validate(isBeforeToday)
  finish_by: Date;
}
