import { UnauthorizedException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/features/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'email',
			passwordField: 'password',
		});
	}

	async validate(username: string, password?: string): Promise<User> {
		return this.authService.validate(username, password);
	}
}
