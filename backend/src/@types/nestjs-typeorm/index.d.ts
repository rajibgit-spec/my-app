declare module '@nestjs/typeorm' {
  export const TypeOrmModule: {
    forRoot(options?: unknown): unknown;
    forFeature(entities?: unknown[]): unknown;
  };
  export function InjectRepository(...args: unknown[]): ParameterDecorator;
}
