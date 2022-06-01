import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { repositoryError } from 'src/shared/handle-error';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	validate(email: string, password: string): Promise<User> {
		return this.userService.showUser({ email, password });
	}

	async signin(user: User): Promise<any> {
		try {
			const payload = { sub: user.id };
			return {
				access_token: this.jwtService.sign(payload),
			};
		} catch (e) {
			repositoryError(e);
		}
	}

	signup(data: CreateUserDto): Promise<User> {
		return this.userService.create(data);
	}
}
