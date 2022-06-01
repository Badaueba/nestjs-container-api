import {
	HttpException,
	Catch,
	ArgumentsHost,
	ExceptionFilter,
	Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private logger = new Logger('HttpExceptionFilter');
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();

		this.logger.verbose(
			`${request.url}[${request.method}]:${exception.message}, ${
				exception.name
			}, ${exception.getResponse()}`,
		);
		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: exception.message || exception.name,
		});
	}
}
