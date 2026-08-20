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
        isbn: 'ISBN-BOOK-1',
        description: 'A book about building good habits.',
        price: 500,
        authorId: 1,
      },
      {
        title: 'Rich Dad Poor Dad',
        isbn: 'ISBN-BOOK-2',
        description: 'A book about money and financial education.',
        price: 650,
        authorId: 1,
      },
      {
        title: 'Deep Work',
        isbn: 'ISBN-BOOK-3',
        description: 'A book about focused and productive work.',
        price: 700,
        authorId: 1,
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
