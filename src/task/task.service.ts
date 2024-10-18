import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseService } from 'src/db/database.provider';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    private DbService: DatabaseService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      return await this.taskRepo.save(createTaskDto);
    } catch (err) {
      this.DbService.uniqueHandler(err, ['title']);
    }
  }

  async findAll() {
    return await this.taskRepo.find();
  }

  async findOne(id: number) {
    try {
      return await this.taskRepo.findOneByOrFail({ id });
    } catch (err) {
      this.DbService.failHandler(err);
    }
  }

  async patch(id: number, updateTaskDto: UpdateTaskDto) {
    const instance = await this.findOne(id);
    if (typeof updateTaskDto.done === 'boolean') {
      instance.done = updateTaskDto.done;
    }
    instance.title = updateTaskDto.title || instance.title;
    return await this.create(instance);
  }

  async remove(id: number) {
    return await this.taskRepo.delete({ id });
  }

  @Cron('59 23 * * *')
  async isNewDay() {
    const task = await this.taskRepo.createQueryBuilder().getOne();
    if (task) {
      const toMill = new Date(task.added).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);

      if (today !== toMill) {
        this.taskRepo
          .createQueryBuilder()
          .update(Task)
          .set({ added: new Date(), done: false })
          .execute();
      }
    }
  }
}
