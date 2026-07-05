import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductsTable1751710000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'sku',
            type: 'varchar',
            length: '60',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '80',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: '0',
          },
          {
            name: 'stock',
            type: 'int',
            default: 0,
          },
          {
            name: 'imageUrl',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '24',
            isNullable: false,
          },
          {
            name: 'rating',
            type: 'float',
            default: 0,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
