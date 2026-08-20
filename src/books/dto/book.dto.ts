import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: 'Atomic Habits',
    description: 'Title of the book',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title!: string;

  @ApiProperty({
    example: 'ISBN-BOOK-5',
    description: 'ISBN of the book',
  })
  @IsNotEmpty({ message: 'ISBN is required' })
  @IsString({ message: 'ISBN must be a string' })
  isbn!: string;

  @ApiPropertyOptional({
    example: 'A book about building good habits',
    description: 'Description of the book',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiProperty({
    example: 500,
    description: 'Price of the book',
    minimum: 0,
  })
  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;
}
