import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { from, map, Observable, of } from 'rxjs';
import { ExternalApiService } from './external-api.service';
import { ExternalProductsList } from './schemas/external-products-list';

const mockProductList: ExternalProductsList = {
	meta: {
		page_number: 1,
		page_size: 10,
	},
	products: [
		{
			brand: 'brand1',
			id: '1',
			image: 'img1',
			price: 10,
			reviewScore: 1,
			title: 'product1',
		},
		{
			brand: 'brand2',
			id: '2',
			image: 'img2',
			price: 20,
			reviewScore: 2,
			title: 'product2',
		},
	],
};

const mockList$: Observable<ExternalProductsList> = of(mockProductList);

const httpMock = jest.fn(() => ({
	get: jest.fn().mockResolvedValue(mockList$),
	axiosRef: {
		interceptors: {
			request: { use: jest.fn(), eject: jest.fn() },
			response: { use: jest.fn(), eject: jest.fn() },
		},
	},
}))();

// get: jest.fn().mockResolvedValue(mockProductList),

describe('Service', () => {
	let service: ExternalApiService;
	let httpService: HttpService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ExternalApiService,
				{
					provide: HttpService,
					useValue: httpMock,
				},
			],
		}).compile();

		service = module.get<ExternalApiService>(ExternalApiService);
		httpService = module.get<HttpService>(HttpService);

		jest.mock('axios', () => {
			return {
				create: jest.fn(() => ({
					get: jest.fn(),
					interceptors: {
						request: { use: jest.fn(), eject: jest.fn() },
						response: { use: jest.fn(), eject: jest.fn() },
					},
				})),
			};
		});
	});

	it('should be defined', () => {
		expect(ExternalApiService).toBeDefined();
	});
});
