import { HttpException, HttpStatus } from '@nestjs/common';

export function repositoryError(error: Record<string, string>) {
	throw new HttpException(
		error,
		+error.status || HttpStatus.SERVICE_UNAVAILABLE,
	);
}
