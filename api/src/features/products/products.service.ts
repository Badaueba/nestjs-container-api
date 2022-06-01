import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { repositoryError } from 'src/shared/handle-error';
import { Repository } from 'typeorm';
import { ExternalListParams } from '../external-api/dto/list-params.dto';
import { ExternalApiService } from '../external-api/external-api.service';
import { FavoriteDto } from './dto/favorite.dto';
import { FavoriteProducts } from './favorite-products.entity';

@Injectable()
export class ProductsService {
	constructor(
		private externalService: ExternalApiService,
		@InjectRepository(FavoriteProducts)
		private readonly productRepository: Repository<FavoriteProducts>,
	) {}

	public async importList(params?: ExternalListParams) {
		return this.externalService.getList(params);
	}

	public async importOne(id: string) {
		return this.externalService.getOne(id);
	}

	public async importMany(favorites: FavoriteProducts[]) {
		const promises = favorites.map((favorite) =>
			this.importOne(favorite.product),
		);

		const externalProducts = await Promise.all(promises);

		return externalProducts;
	}

	public async checkFavorite(data: FavoriteDto) {
		try {
			const favorite = await this.productRepository
				.createQueryBuilder('favorites')
				.where('favorites.listId = :list', { list: data.list })
				.andWhere('favorites.product = :product', {
					product: data.product,
				})
				.getOne();

			return favorite;
		} catch (e) {
			repositoryError(e);
		}
	}

	public async getFavoriteProducts(list: string) {
		try {
			const favorites: FavoriteProducts[] = await this.productRepository
				.createQueryBuilder('favorites')
				.where('favorites.listId = :list', { list })
				.getMany();

			return this.importMany(favorites);
		} catch (e) {
			repositoryError(e);
		}
	}

	public async makeFavorite(data: FavoriteDto) {
		try {
			await this.importOne(data.product).catch((error) => {
				throw new HttpException(
					'Product is not available',
					error.response.status || HttpStatus.NOT_FOUND,
				);
			});

			const alreadyFavorite = await this.checkFavorite(data);

			if (alreadyFavorite)
				throw new HttpException(
					'Product already saved to this list',
					HttpStatus.BAD_REQUEST,
				);

			const favorite = new FavoriteProducts();
			favorite.product = data.product;
			favorite.list = data.list;

			return this.productRepository.save({
				list: favorite.list,
				product: favorite.product,
			});
		} catch (e) {
			repositoryError(e);
		}
	}

	public async removeFavorite(data: FavoriteDto) {
		try {
			const result = await this.productRepository.delete({
				list: data.list,
				product: data.product,
			});
			return result.affected > 0 ? true : false;
		} catch (e) {
			repositoryError(e);
		}
	}

	public async makeManyFavorites(list: string, products: string[]) {
		try {
			const promises = products.map((product) =>
				this.makeFavorite({
					product,
					list,
				}),
			);

			const favoriteProducts: FavoriteProducts[] = await Promise.all(
				promises,
			);

			return favoriteProducts;
		} catch (e) {
			repositoryError(e);
		}
	}
}
