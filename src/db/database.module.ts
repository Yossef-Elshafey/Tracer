import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseService } from './database.provider';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        // Return the options
        return {
          type: 'mariadb',
          host: process.env['HOST'],
          port: +process.env['PORT'],
          username: process.env['USERNAME'],
          password: process.env['PASSWORD'],
          database: process.env['DATABASE'],
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
