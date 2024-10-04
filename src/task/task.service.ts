import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseService } from 'src/db/database.provider';

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

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const instance = await this.findOne(id);
    instance.done = updateTaskDto.done;
    return this.create(instance);
  }

  async remove(id: number) {
    return await this.taskRepo.delete({ id });
  }
}
