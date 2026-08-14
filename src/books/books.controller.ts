import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // GET ALL BOOKS
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // GET ONE BOOK
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }

  // CREATE BOOK
  @Post()
  create(@Body() book: CreateBookDto) {
    return this.booksService.create(book);
  }

  // UPDATE BOOK
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedBook: UpdateBookDto,
  ) {
    console.log('CONTROLLER BODY:', updatedBook);

    return this.booksService.update(Number(id), updatedBook);
  }

  // DELETE BOOK
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(Number(id));
  }
}