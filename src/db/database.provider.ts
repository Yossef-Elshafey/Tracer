import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor() {}

  uniqueHandler(err: Error, key: string[]) {
    if (err instanceof QueryFailedError) {
      throw new HttpException(
        `${key.join('-')} should be unique`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  failHandler(err: Error) {
    if (err instanceof EntityNotFoundError) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
