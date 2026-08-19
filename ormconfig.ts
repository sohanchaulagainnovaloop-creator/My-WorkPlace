import { DataSource } from 'typeorm';
import { Book } from './src/books/entities/book.entity';
import { User } from './src/users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin123',
  database: 'book-management-api',
  entities: [Book, User],
  migrations: ['src/database/migrations/*.ts'],
});
