import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plan')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  plan: string;

  @Column()
  steps: number;

  @Column({ default: 0 })
  progress: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE()' })
  added: Date;

  @Column({ type: 'date' })
  finish_by: Date;

  @Column({ type: 'boolean', default: false })
  state: boolean;
}
