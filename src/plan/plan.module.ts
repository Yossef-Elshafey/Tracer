import { Module, OnModuleInit } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), ScheduleModule.forRoot()],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule implements OnModuleInit {
  constructor(private readonly planService: PlanService) {}

  async onModuleInit() {
    // server were down
    await this.planService.isExpired();
  }
}
