import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('note')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Get('')
  getAll() {
    return this.noteService.getAll();
  }

  @Post('')
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.noteService.delete(+id);
  }
}
