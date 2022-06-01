import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
	handleRequest(err: Error, user, info) {
		if (err || !user) {
			throw new HttpException(
				'Credentials failed',
				HttpStatus.BAD_REQUEST,
			);
		}
		return user;
	}
}
