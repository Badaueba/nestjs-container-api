import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';

describe('FavouritesController', () => {
	let controller: FavoritesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FavoritesController],
		}).compile();

		controller = module.get<FavoritesController>(FavoritesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
