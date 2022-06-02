import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

import { mockDetailedList, mockFavoriteLists } from './favorites.service.spec';

describe('FavouritesController', () => {
	let controller: FavoritesController;

	let favoritesService: FavoritesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FavoritesController],
			providers: [
				{
					provide: FavoritesService,
					useValue: {
						listAll: jest.fn().mockResolvedValue(mockFavoriteLists),
						listDetailed: jest
							.fn()
							.mockResolvedValue(mockDetailedList),
						create: jest.fn().mockResolvedValue({ id: '1' }),
						deleteList: jest.fn().mockResolvedValue(true),
						addItems: jest
							.fn()
							.mockResolvedValue(mockDetailedList.products[0]),
						removeItems: jest.fn().mockResolvedValue(true),
					},
				},
			],
		}).compile();

		controller = module.get<FavoritesController>(FavoritesController);
		favoritesService = module.get<FavoritesService>(FavoritesService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should list all', async () => {
		await expect(controller.listAll()).resolves.toEqual(mockFavoriteLists);
	});

	it('should list one detailed', async () => {
		await expect(controller.listDetailed('1')).resolves.toEqual(
			mockDetailedList,
		);
	});

	it('should list create one', async () => {
		await expect(controller.create({ user: '1' })).resolves.toEqual(
			mockFavoriteLists[0],
		);
	});

	it('should list delete one', async () => {
		await expect(controller.delete({ id: '1' })).resolves.toEqual(true);
	});

	it('should add items for the list', async () => {
		await expect(
			controller.addItems({ product: 'a0020', list: '1' }),
		).resolves.toEqual(mockDetailedList.products[0]);
	});

	it('should remove items for the list', async () => {
		await expect(
			controller.removeItems({ product: 'a0020', list: '1' }),
		).resolves.toEqual(true);
	});
});
