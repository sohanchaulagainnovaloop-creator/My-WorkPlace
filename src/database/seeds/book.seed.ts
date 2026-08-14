import { AppDataSource } from '../../../ormconfig';
import { Book } from '../../books/entities/book.entity';

async function seed() {
  try {
    console.log('Connecting to database...');

    await AppDataSource.initialize();

    console.log('Database connected!');

    const bookRepository = AppDataSource.getRepository(Book);

    const books = [
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        price: 500,
      },
      {
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        price: 650,
      },
      {
        title: 'Deep Work',
        author: 'Cal Newport',
        price: 700,
      },
    ];

    await bookRepository.save(books);

    console.log('Books seeded successfully!');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seed();
