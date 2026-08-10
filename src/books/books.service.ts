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

  // GET ALL BOOKS
  findAll() {
    return this.books;
  }

  // GET ONE BOOK
  findOne(id: number) {
    return this.books.find((book) => book.id === id);
  }

  // CREATE BOOK
  create(book: any) {
    // Check for duplicate title
    const existingBook = this.books.find(
      (b) =>
        b.title.toLowerCase() ===
        (typeof book?.title === 'string' ? book.title : '').toLowerCase(),
    );

    if (existingBook) {
      return {
        message: 'Book already exists!',
      };
    }

    const newBook = {
      id: this.books.length + 1,
      title: book.title,
      author: book.author,
      price: book.price,
    };

    this.books.push(newBook);

    return {
      message: 'Book added successfully!',
      book: newBook,
    };
  }

  // UPDATE BOOK
  update(id: number, updatedBook: any) {
    // Find the book
    const book = this.books.find((b) => b.id === id);

    if (!book) {
      return {
        message: 'Book not found!',
      };
    }

    // Check if another book already has the same title
    const duplicateBook = this.books.find(
      (b) =>
        b.id !== id &&
        b.title.toLowerCase() ===
        (typeof updatedBook?.title === 'string' ? updatedBook.title : '').toLowerCase(),
    );

    if (duplicateBook) {
      return {
        message: 'Another book with this title already exists!',
      };
    }

    // Update book
    book.title = updatedBook.title;
    book.author = updatedBook.author;
    book.price = updatedBook.price;

    return {
      message: 'Book updated successfully!',
      book: book,
    };
  }

  // DELETE BOOK
  remove(id: number) {
    // Find the position of the book
    const index = this.books.findIndex((book) => book.id === id);

    // Check if book exists
    if (index === -1) {
      return {
        message: 'Book not found!',
      };
    }

    // Delete the book
    const deletedBook = this.books.splice(index, 1);

    return {
      message: 'Book deleted successfully!',
      book: deletedBook[0],
    };
  }
}