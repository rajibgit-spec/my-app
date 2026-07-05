declare module 'dotenv' {
  export function config(): { parsed?: Record<string, string> };
}

declare module 'typeorm' {
  export class DataSource {}
  export interface MigrationInterface {
    up(queryRunner: unknown): Promise<void>;
    down(queryRunner: unknown): Promise<void>;
  }
  export interface QueryRunner {}
  export class Table {}
  export interface Repository<T> {}
}

declare module '@nestjs/typeorm' {
  export const TypeOrmModule: unknown;
  export function InjectRepository(): unknown;
}
