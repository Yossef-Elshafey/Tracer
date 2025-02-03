import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TaskModule } from './task/task.module';
import { PlanModule } from './plan/plan.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TaskModule,
    PlanModule,
    NotesModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
