import { ApiResponseProperty } from '@nestjs/swagger';

export class JwtUserRef {
	@ApiResponseProperty()
	id: string;
}
