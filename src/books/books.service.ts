import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 500,
    },
    {
      id: 2,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      price: 650,
    },
    {
      id: 3,
      title: 'Deep Work',
      author: 'Cal Newport',
      price: 700,
    },
  ];

  findAll() {
    return this.books;
  }
}
