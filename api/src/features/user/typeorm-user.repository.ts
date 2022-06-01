import { User } from 'src/features/user/user.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	public async findByEmail(email: string): Promise<User> {
		return this.findOne({ email });
	}

	public async signup(data: User): Promise<User> {
		return this.save(data);
	}
}
