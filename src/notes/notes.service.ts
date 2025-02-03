import { Injectable } from '@nestjs/common';
import { Note } from './entities/notes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private noteRepo: Repository<Note>) {}

  async getAll() {
    return await this.noteRepo.find();
  }

  async create(createNoteDto: CreateNoteDto) {
    return await this.noteRepo.save(createNoteDto);
  }

  delete(id: number) {
    return this.noteRepo.delete(id);
  }
}
