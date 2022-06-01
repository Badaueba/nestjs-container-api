import {
	Injectable,
	ExecutionContext,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		return super.canActivate(context);
	}

	handleRequest(err: Error, user: any, info: any) {
		if (err || !user) {
			throw new HttpException(info, HttpStatus.UNAUTHORIZED);
		}
		return user;
	}
}
