declare module 'dotenv' {
  export function config(): unknown;
}

declare module 'typeorm' {
  export interface Repository<T> {}
  export class DataSource {}
  export interface MigrationInterface {
    up(queryRunner: unknown): Promise<void>;
    down(queryRunner: unknown): Promise<void>;
  }
  export interface QueryRunner {}
  export class Table {}
}

declare module '@nestjs/typeorm' {
  export const TypeOrmModule: unknown;
  export function InjectRepository(): unknown;
}
