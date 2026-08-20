import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBookAuthorRelationship1787216656631 implements MigrationInterface {
  name = 'AddBookAuthorRelationship1787216656631';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "books"
      ADD "isbn" varchar
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      ADD "description" varchar
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      ADD "authorId" integer
    `);

    await queryRunner.query(`
      UPDATE "books"
      SET "isbn" = 'ISBN-BOOK-' || "id"
    `);

    await queryRunner.query(`
      UPDATE "books"
      SET "authorId" = 1
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      ALTER COLUMN "isbn" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      ALTER COLUMN "authorId" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      DROP COLUMN "author"
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      ADD CONSTRAINT "UQ_books_isbn" UNIQUE ("isbn")
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      ADD CONSTRAINT "FK_books_author"
      FOREIGN KEY ("authorId")
      REFERENCES "users"("id")
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "books"
      DROP CONSTRAINT "FK_books_author"
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      DROP CONSTRAINT "UQ_books_isbn"
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      ADD "author" varchar
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      DROP COLUMN "authorId"
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      DROP COLUMN "description"
    `);

    await queryRunner.query(`
      ALTER TABLE "books"
      DROP COLUMN "isbn"
    `);
  }
}
