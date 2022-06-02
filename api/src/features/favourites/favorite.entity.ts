import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/features/user/user.entity';
import {
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FavoriteProducts } from '../products/favorite-products.entity';

@Entity('favourites')
export class FavoriteList {
	@PrimaryColumn({
		type: 'uuid',
		unique: true,
		nullable: false,
	})
	@ApiProperty()
	public readonly id: string;

	@OneToOne(() => User, (user) => user.favoriteList, { onDelete: 'CASCADE' })
	@JoinColumn()
	user: User;

	@OneToMany(() => FavoriteProducts, (products) => products.list, {})
	products?: FavoriteProducts[];

	constructor(props: Omit<FavoriteList, 'id'>) {
		Object.assign(this, props);
		this.id = uuid();
	}
}
