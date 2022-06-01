import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthUser {
	@ApiResponseProperty()
	access_token: string;
}
