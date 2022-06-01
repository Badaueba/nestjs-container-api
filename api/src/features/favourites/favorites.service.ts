import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { repositoryError } from 'src/shared/handle-error';
import { Repository } from 'typeorm';
import { FavoriteDto } from '../products/dto/favorite.dto';
import { ProductsService } from '../products/products.service';
import { UserService } from '../user/user.service';
import { CreateListDto } from './dto/create-list.dto';
import { FavoriteList } from './favorite.entity';

import { FullFavoriteList } from './schemas/full-favorite-list';

@Injectable()
export class FavoritesService {
	constructor(
		@InjectRepository(FavoriteList)
		private readonly favoriteRepository: Repository<FavoriteList>,
		private userService: UserService,
		private productsService: ProductsService,
	) {}

	public async listAll(): Promise<FavoriteList[]> {
		try {
			return this.favoriteRepository.find();
		} catch (error) {
			repositoryError(error);
		}
	}

	public async listDetailed(id: string): Promise<FullFavoriteList> {
		try {
			const list = await this.favoriteRepository.findOneBy({ id });

			if (!list)
				throw new HttpException(
					'List was not found',
					HttpStatus.NOT_FOUND,
				);

			const favoriteProducts =
				await this.productsService.getFavoriteProducts(list.id);

			return {
				id: id,
				products: favoriteProducts,
				user: list.user,
			};
		} catch (e) {
			repositoryError(e);
		}
	}

	public async create(data: CreateListDto): Promise<FavoriteList> {
		try {
			const alreadyExists = await this.favoriteRepository.findOne({
				where: { user: { id: data.user } },
			});
			if (alreadyExists)
				throw new HttpException(
					'User Already has a favorite list',
					HttpStatus.BAD_REQUEST,
				);

			const user = await this.userService.findById(data.user);

			const favoriteEntity = new FavoriteList({
				user,
			});

			const favoriteList = await this.favoriteRepository.save(
				favoriteEntity,
			);

			if (data.products && data.products.length) {
				await this.productsService.makeManyFavorites(
					favoriteList.id,
					data.products,
				);
			}

			return favoriteList;
		} catch (error) {
			repositoryError(error);
		}
	}
	public async deleteList(id: string) {
		try {
			const result = await this.favoriteRepository.delete(id);
			return result.affected > 0 ? true : false;
		} catch (error) {
			repositoryError(error);
		}
	}

	public async addItems(data: FavoriteDto) {
		return this.productsService.makeFavorite(data);
	}
	public async removeItems(data: FavoriteDto) {
		return this.productsService.removeFavorite(data);
	}
}
