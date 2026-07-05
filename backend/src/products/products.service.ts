import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: 'In stock' | 'Low stock' | 'Out of stock';
  rating: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SingleResourceResponse<T> {
  data: T;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  /**
   * Returns a paginated list of products that matches the query filters.
   */
  async findAll(query: ProductQueryDto): Promise<PaginatedResponse<ProductEntity>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const search = query.search?.trim().toLowerCase() ?? '';
    const category = query.category?.trim();
    const status = query.status?.trim();

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (search) {
      queryBuilder.andWhere('LOWER(product.name) LIKE :search OR LOWER(product.sku) LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (status) {
      queryBuilder.andWhere('product.status = :status', { status });
    }

    const [data, total] = await Promise.all([
      queryBuilder.skip((page - 1) * limit).take(limit).getMany(),
      queryBuilder.getCount(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  /**
   * Returns a single product by id.
   */
  async findOne(id: number): Promise<SingleResourceResponse<ProductEntity>> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return { data: product };
  }

  /**
   * Creates a new product.
   */
  async create(dto: CreateProductDto): Promise<SingleResourceResponse<ProductEntity>> {
    const created = this.productRepository.create(dto);
    const saved = await this.productRepository.save(created);

    return { data: saved };
  }

  /**
   * Updates an existing product.
   */
  async update(id: number, dto: UpdateProductDto): Promise<SingleResourceResponse<ProductEntity>> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updated = await this.productRepository.save({ ...product, ...dto });

    return { data: updated };
  }

  /**
   * Removes a product by id.
   */
  async remove(id: number): Promise<SingleResourceResponse<{ deleted: boolean }>> {
    const result = await this.productRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Product not found');
    }

    return { data: { deleted: true } };
  }
}
