import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserRole1787207359274 implements MigrationInterface {
  name = 'AddUserRole1787207359274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role',
        type: 'varchar',
        default: "'USER'",
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'role');
  }
}
