import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { SigninUserDTO } from './dto/signin-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { repositoryError } from 'src/shared/handle-error';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	protected async findByEmail(email: string) {
		try {
			return this.userRepository.findOne({
				where: { email },
			});
		} catch (e) {
			repositoryError(e);
		}
	}

	async findById(id: string): Promise<User> {
		try {
			const user = await this.userRepository.findOne({
				where: { id },
			});
			if (!user)
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			return user;
		} catch (e) {
			repositoryError(e);
		}
	}

	public async showUser(data: SigninUserDTO) {
		try {
			const user = await this.findByEmail(data.email);

			if (!user)
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);

			const validPass = await user.validatePass(data.password);

			if (!validPass)
				throw new HttpException(
					'Password is incorrect',
					HttpStatus.BAD_REQUEST,
				);
			return user;
		} catch (e) {
			repositoryError(e);
		}
	}

	async showAll(): Promise<User[]> {
		try {
			const users = await this.userRepository.find();
			return users;
		} catch (e) {
			repositoryError(e);
		}
	}

	async create(data: CreateUserDto): Promise<User> {
		try {
			const alreadyExists = await this.findByEmail(data.email);
			if (alreadyExists)
				throw new HttpException(
					'User Already Exists',
					HttpStatus.BAD_REQUEST,
				);

			const userEntity = new User(data);
			const user = await this.userRepository.save(userEntity);
			return user;
		} catch (e) {
			repositoryError(e);
		}
	}

	async update(id: string, data: Partial<CreateUserDto>): Promise<boolean> {
		try {
			const user = await this.findById(id);
			if (!user)
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			await this.userRepository.update(id, data);
			return true;
		} catch (e) {
			repositoryError(e);
		}
	}

	async remove(id: string): Promise<boolean> {
		try {
			const user = await this.findById(id);
			if (!user)
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			await this.userRepository.delete(id);
			return true;
		} catch (e) {
			repositoryError(e);
		}
	}
}
