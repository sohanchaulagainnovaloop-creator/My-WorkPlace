import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private readonly bookRepository: Repository<Book>;

  constructor(private readonly dataSource: DataSource) {
    this.bookRepository = this.dataSource.getRepository(Book);
    console.log('BookRepository created successfully');
  }

  // GET ALL BOOKS
  async findAll() {
    return await this.bookRepository.find({
      relations: {
  author: true,
},
    });
  }

  // GET ONE BOOK
  async findOne(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: {
  author: true,
},
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  // CREATE BOOK
  async create(
  createBookDto: CreateBookDto,
  user: { id: number; email: string; role: string },
) {
    // Check for duplicate title in database
    const existingBook = await this.bookRepository
      .createQueryBuilder('book')
      .where('LOWER(book.title) = LOWER(:title)', {
        title: createBookDto.title,
      })
      .getOne();

    if (existingBook) {
      return {
        message: 'Book already exists!',
      };
    }

    // Create book and automatically assign
    // the logged-in user as the author
    const newBook = this.bookRepository.create({
      ...createBookDto,
      authorId: user.id,
    });

    const savedBook = await this.bookRepository.save(newBook);

    return {
      message: 'Book added successfully!',
      book: savedBook,
    };
  }

  // UPDATE BOOK
  async update(id: number, updateBookDto: UpdateBookDto) {
    // Find book in database
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: {
  author: true,
},
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Check duplicate title only if title is being updated
    if (updateBookDto.title !== undefined) {
      const duplicateBook = await this.bookRepository
        .createQueryBuilder('book')
        .where('LOWER(book.title) = LOWER(:title)', {
          title: updateBookDto.title,
        })
        .andWhere('book.id != :id', { id })
        .getOne();

      if (duplicateBook) {
        return {
          message: 'Another book with this title already exists!',
        };
      }
    }

    // Update the book
    Object.assign(book, updateBookDto);

    const updatedBook = await this.bookRepository.save(book);

    return {
      message: 'Book updated successfully!',
      book: updatedBook,
    };
  }

  // DELETE BOOK
  async remove(id: number) {
    // Find book in database
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: {
  author: true,
},
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Delete from database
    await this.bookRepository.remove(book);

    return {
      message: 'Book deleted successfully!',
      book,
    };
  }
}
