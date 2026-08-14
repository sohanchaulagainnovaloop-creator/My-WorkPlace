import { DataSource } from 'typeorm';
import { Book } from './src/books/entities/book.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'book-management-api',

  entities: [Book],

  migrations: ['src/database/migrations/*.ts'],
});
