import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue({
              data: [{ id: 1, name: 'Aurora Headset' }],
              meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('returns a paginated payload for list requests', async () => {
    const response = await controller.findAll({ page: 1, limit: 10 });

    expect(response.data).toHaveLength(1);
    expect(response.meta.total).toBe(1);
  });
});
