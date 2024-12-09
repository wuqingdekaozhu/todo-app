import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


// +------------------------------------------------------------------------------------------------------------------------+
// | define task entity and map to the data table                                                                           |
// +------------------------------------------------------------------------------------------------------------------------+
@Entity('data')
export class Task {
  @PrimaryGeneratedColumn()                                                             // primary key column
  id: number;

  @Column()                                                                             // required title column
  title: string;

  @Column({ nullable: true })                                                           // description column, nullable
  description?: string;

  @Column({ type: 'enum', enum: ['Pending', 'Completed'], default: 'Pending' })         // status column, enum
  status: 'Pending' | 'Completed';

  @CreateDateColumn({ type: 'timestamp' })                                              // created at column, timestamp
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })                                              // updated at column, timestamp
  updatedAt: Date;
}
