import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  name!: string;

  @Column({ length: 60, unique: true })
  sku!: string;

  @Column({ length: 80 })
  category!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price!: number;

  @Column({ type: 'int', default: 0 })
  stock!: number;

  @Column({ type: 'text' })
  imageUrl!: string;

  @Column({ type: 'varchar', length: 24 })
  status!: 'In stock' | 'Low stock' | 'Out of stock';

  @Column({ type: 'float', default: 0 })
  rating!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
