import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductEntity } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'postgres',
      database: process.env.DB_NAME ?? 'myapp',
      entities: [ProductEntity],
      migrations: [join(__dirname, 'database', 'migrations', '*.ts'), join(__dirname, 'database', 'migrations', '*.js')],
      migrationsRun: true,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}
