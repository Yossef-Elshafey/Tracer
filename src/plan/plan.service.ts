import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { DatabaseService } from 'src/db/database.provider';
import { Cron } from '@nestjs/schedule';
import { log } from 'console';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private planRepo: Repository<Plan>,
    private dbService: DatabaseService,
  ) {}

  @Cron('59 23 * * *')
  async isExpired() {
    const plans = await this.findAll();

    for (const i in plans) {
      const { finish_by, id } = plans[i];
      const toMill = new Date(finish_by).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      if (today >= toMill) {
        await this.planRepo.update(id, { state: true });
      }
    }
  }

  async create(createPlanDto: CreatePlanDto) {
    try {
      return await this.planRepo.save(createPlanDto);
    } catch (err) {
      this.dbService.uniqueHandler(err, ['plan']);
    }
  }

  async findAll() {
    return await this.planRepo.find({ order: { finish_by: 'ASC' } });
  }

  async findOne(id: number) {
    try {
      return await this.planRepo.findOneByOrFail({ id });
    } catch (err) {
      this.dbService.failHandler(err);
    }
  }

  private toPercentage(number: number, total: number): number {
    return (number / total) * 100;
  }

  private toOrig(perc: number, total: number): number {
    return total * (perc / 100);
  }

  async update(id: number, updatePLanDto: UpdatePlanDto) {
    const instance = await this.findOne(id);
    const orig = this.toOrig(instance.progress, instance.steps);
    instance.progress = this.toPercentage(
      orig + updatePLanDto.progress,
      instance.steps,
    );
    return this.create(instance);
  }

  async remove(id: number) {
    return await this.planRepo.delete({ id });
  }
}
