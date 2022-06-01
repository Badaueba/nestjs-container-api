import {
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { FavoriteList } from '../favourites/favorite.entity';

@Entity('favourite-products')
export class FavoriteProducts {
	@PrimaryColumn({
		type: 'uuid',
		unique: true,
		nullable: false,
	})
	product: string;

	@ManyToOne(() => FavoriteList, (list) => list.products, {
		onDelete: 'CASCADE',
		eager: true,
	})
	list: string;
}
