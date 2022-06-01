import { EntityRepository, Repository } from 'typeorm';
import { FavoriteList } from './favorite.entity';

@EntityRepository(FavoriteList)
export class FavoriteListRepository extends Repository<FavoriteList> {
	public async findByID(id: string): Promise<FavoriteList> {
		return this.findOne(id, {
			relations: ['user'],
		});
	}

	public async findByUser(user: string): Promise<FavoriteList> {
		return this.findOne({
			where: { user },
		});
	}

	public async listAllLists() {
		return this.find();
	}

	public async createList(data: FavoriteList) {
		return this.save(data);
	}

	public async deleteList(id: string) {
		const result = await this.delete(id);
		return result.affected > 0 ? true : false;
	}
}
