import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Book, (book) => book.author)
  books!: Book[];

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'USER' })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
