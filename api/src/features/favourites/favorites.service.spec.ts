import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { UserService } from '../user/user.service';
import { FavoriteList } from './favorite.entity';
import { FavoritesService } from './favorites.service';

import { mockUser } from '../user/user.service.spec';

export const mockFavoriteLists = [{ id: '1' }, { id: '2' }];
export const mockDetailedList: Partial<FavoriteList> = {
	id: '1',
	products: [
		{
			list: '1',
			product: '12030a02030',
		},
	],
};

describe('FavoritesService', () => {
	let service: FavoritesService;

	let productsService: ProductsService;
	let userService: UserService;
	let favoritesRepository: Repository<FavoriteList>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FavoritesService,
				{
					provide: UserService,
					useValue: {
						findById: jest.fn(),
					},
				},
				{
					provide: ProductsService,
					useValue: {
						getFavoriteProducts: jest
							.fn()
							.mockResolvedValue(mockDetailedList.products),
						makeManyFavorites: jest.fn(),
						makeFavorite: jest.fn(),
						removeFavorite: jest.fn(),
					},
				},
				{
					provide: getRepositoryToken(FavoriteList),
					useValue: {
						find: jest.fn().mockResolvedValue(mockFavoriteLists),
						findOneBy: jest
							.fn()
							.mockResolvedValue(mockFavoriteLists[0]),
						findOne: jest.fn(),
						save: jest.fn().mockResolvedValue(mockFavoriteLists[0]),
						delete: jest.fn().mockResolvedValue(true),
					},
				},
			],
		}).compile();

		service = module.get<FavoritesService>(FavoritesService);
		userService = module.get<UserService>(UserService);
		productsService = module.get<ProductsService>(ProductsService);
		favoritesRepository = module.get<Repository<FavoriteList>>(
			getRepositoryToken(FavoriteList),
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should list all', async () => {
		await expect(service.listAll()).resolves.toEqual(mockFavoriteLists);
	});

	it('should list one detailed', async () => {
		await expect(service.listDetailed('1')).resolves.toEqual(
			mockDetailedList,
		);
	});

	it('should create empty list', async () => {
		await expect(
			service.create({ user: 'aaa', products: [] }),
		).resolves.toEqual(mockFavoriteLists[0]);
	});

	it('should not create cause user already has a list', async () => {
		jest.spyOn(favoritesRepository, 'findOne').mockResolvedValueOnce(
			new FavoriteList({
				user: mockUser,
				products: [],
			}),
		);
		await expect(
			service.create({ user: 'aaa', products: [] }),
		).rejects.toThrowError();
	});
});
