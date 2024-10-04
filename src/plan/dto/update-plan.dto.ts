import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDto } from './create-plan.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {
  @IsNotEmpty()
  @IsNumber()
  progress: number;
}
