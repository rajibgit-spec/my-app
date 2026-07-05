declare module 'typeorm' {
  export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

  export type PropertyDecorator = (target: object, propertyKey: string | symbol) => void;
  export type ClassDecorator = <TFunction extends Function>(target: TFunction) => void;

  export function Column(options?: unknown): PropertyDecorator;
  export function CreateDateColumn(options?: unknown): PropertyDecorator;
  export function UpdateDateColumn(options?: unknown): PropertyDecorator;
  export function Entity(name?: string): ClassDecorator;
  export function PrimaryGeneratedColumn(): PropertyDecorator;

  export class Table {
    constructor(options?: unknown);
  }

  export interface QueryRunner {
    createTable(table: Table, ifNotExist?: boolean): Promise<void>;
    dropTable(tableName: string): Promise<void>;
  }

  export class DataSource {
    constructor(options?: unknown);
  }

  export interface MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
  }

  export class Repository<T> {
    create(entity: DeepPartial<T>): T;
    save(entity: T | T[]): Promise<T>;
    findOneBy(criteria: unknown): Promise<T | null>;
    createQueryBuilder(alias?: string): unknown;
    delete(id: unknown): Promise<{ affected?: number }>;
  }
}
