import { EntityRepository, Repository } from 'typeorm';
import { FavoriteProducts } from './favorite-products.entity';

@EntityRepository(FavoriteProducts)
export class ProductRespository extends Repository<FavoriteProducts> {
	public async findByID(id: string): Promise<FavoriteProducts> {
		return this.findOne(id);
	}

	public async checkFavorite(
		product: string,
		list: string,
	): Promise<FavoriteProducts> {
		return this.findOne({
			where: { product, list },
		});
	}

	public async getFavoriteProducts(list: string) {
		return this.find({ where: { list: list } });
	}

	public async listAll() {
		return this.find();
	}

	public async makeFavorite(data: FavoriteProducts) {
		return this.save(data);
	}

	public async deleteFavorite(product: string, list: string) {
		const result = await this.delete({ product, list });
		return result.affected > 0 ? true : false;
	}
}
