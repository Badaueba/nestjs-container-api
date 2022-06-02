import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalApiService } from '../external-api/external-api.service';
import { FavoriteProducts } from './favorite-products.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
	let service: ProductsService;
	let externalService: ExternalApiService;
	let repository: Repository<FavoriteProducts>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductsService,
				{
					provide: ExternalApiService,
					useValue: {
						getList: jest.fn(),
						getOne: jest.fn(),
					},
				},
				{
					provide: getRepositoryToken(FavoriteProducts),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<ProductsService>(ProductsService);
		externalService = module.get<ExternalApiService>(ExternalApiService);
		repository = module.get<Repository<FavoriteProducts>>(
			getRepositoryToken(FavoriteProducts),
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
