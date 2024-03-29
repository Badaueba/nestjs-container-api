import { Test, TestingModule } from '@nestjs/testing';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
	let controller: ProductsController;

	let productsService: ProductsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers: [
				{
					provide: ProductsService,
					useValue: {},
				},
			],
		}).compile();

		controller = module.get<ProductsController>(ProductsController);
		productsService = module.get<ProductsService>(ProductsService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
