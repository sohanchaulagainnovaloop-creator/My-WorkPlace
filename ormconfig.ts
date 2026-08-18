import { DataSource } from 'typeorm';
import { Book } from './src/books/entities/book.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin123',
  database: 'book-management-api',
  entities: [Book],
  migrations: ['src/database/migrations/*.ts'],
});
