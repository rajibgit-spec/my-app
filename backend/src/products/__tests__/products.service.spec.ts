import { ProductsService } from '../products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: {
    createQueryBuilder: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    findOneBy: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(() => {
    repository = {
      createQueryBuilder: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };

    service = new ProductsService(repository as never);
  });

  it('returns paginated products with matching metadata', async () => {
    const queryBuilder = {
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(1),
      getMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Aurora Headset',
          sku: 'AUR-100',
          category: 'Audio',
          price: 249,
          stock: 42,
          imageUrl: 'https://example.com/image.png',
          status: 'In stock',
          rating: 4.8,
        },
      ]),
    };

    repository.createQueryBuilder.mockReturnValue(queryBuilder);

    const result = await service.findAll({ page: 1, limit: 2, search: 'aur' });

    expect(result.data).toHaveLength(1);
    expect(result.meta).toEqual({
      total: 1,
      page: 1,
      limit: 2,
      totalPages: 1,
    });
  });

  it('creates a new product and returns it', async () => {
    repository.create.mockReturnValue({ name: 'Echo Speaker' });
    repository.save.mockResolvedValue({
      id: 99,
      name: 'Echo Speaker',
      sku: 'ECH-001',
      category: 'Audio',
      price: 149,
      stock: 12,
      imageUrl: 'https://example.com/speaker.png',
      status: 'In stock',
      rating: 4.5,
    });

    const created = await service.create({
      name: 'Echo Speaker',
      sku: 'ECH-001',
      category: 'Audio',
      price: 149,
      stock: 12,
      imageUrl: 'https://example.com/speaker.png',
      status: 'In stock',
      rating: 4.5,
    });

    expect(created.data.id).toBe(99);
    expect(created.data.name).toBe('Echo Speaker');
  });
});
