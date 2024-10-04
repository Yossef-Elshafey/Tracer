import { Module, OnModuleInit } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements OnModuleInit {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  async onModuleInit() {
    const task = await this.taskRepo.createQueryBuilder().getOne();
    const toMill = new Date(task.added).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    if (today !== toMill) {
      this.taskRepo
        .createQueryBuilder()
        .update(Task)
        .set({ added: new Date() })
        .execute();
    }
  }
}
