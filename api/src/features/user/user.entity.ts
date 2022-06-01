import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	JoinTable,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FavoriteList } from '../favourites/favorite.entity';

import * as bcrypt from 'bcrypt';
const BCRYPT_HASH_ROUND = 10;

@Entity('users')
export class User extends BaseEntity {
	@PrimaryColumn({
		type: 'uuid',
		unique: true,
		nullable: false,
	})
	@ApiProperty()
	public readonly id: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	@ApiProperty()
	public name: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	@ApiProperty()
	public address: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
		unique: true,
	})
	@ApiProperty()
	public email: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	@Exclude()
	@ApiProperty()
	private password: string;

	@OneToOne(() => FavoriteList, (favorite) => favorite.user)
	@JoinTable()
	favoriteList: FavoriteList;

	constructor(props: Partial<User>) {
		super();
		Object.assign(this, props);
		this.id = uuid();
	}

	@BeforeInsert()
	protected async beforeInsert(): Promise<void> {
		this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUND);
	}

	public async validatePass(password: string): Promise<boolean> {
		const valid = await bcrypt.compare(password, this.password);
		return valid ? true : false;
	}
}
