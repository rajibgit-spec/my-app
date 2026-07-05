import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List products' })
  @ApiResponse({ status: 200, description: 'Products returned successfully' })
  async findAll(@Query() query: ProductQueryDto): Promise<ReturnType<ProductsService['findAll']>> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Product found' })
  async findOne(@Param('id') id: string): Promise<ReturnType<ProductsService['findOne']>> {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  async create(@Body() createProductDto: CreateProductDto): Promise<ReturnType<ProductsService['create']>> {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ReturnType<ProductsService['update']>> {
    return this.productsService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  async remove(@Param('id') id: string): Promise<ReturnType<ProductsService['remove']>> {
    return this.productsService.remove(Number(id));
  }
}
