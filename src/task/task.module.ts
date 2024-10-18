import { Module, OnModuleInit } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements OnModuleInit {
  constructor(private taskService: TaskService) {}

  async onModuleInit() {
    this.taskService.isNewDay();
  }
}
