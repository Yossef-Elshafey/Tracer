import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  title: string;

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @Column({ type: 'date', default: () => 'CURRENT_DATE()' })
  added: Date;
}
