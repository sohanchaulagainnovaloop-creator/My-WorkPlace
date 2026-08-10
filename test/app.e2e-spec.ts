import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/books (POST) should reject missing title', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .send({ author: 'Test Author', price: 100 })
      .expect(400);
  });

  it('/books/:id (PUT) should allow partial updates', async () => {
    const response = await request(app.getHttpServer())
      .put('/books/1')
      .send({ title: 'Updated Atomic Habits' })
      .expect(200);

    expect(response.body.book.title).toBe('Updated Atomic Habits');
  });

  afterEach(async () => {
    await app.close();
  });
});
