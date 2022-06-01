import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Luiza Labs')
		.setDescription('Test api for luiza labs')
		.setVersion('1.0')
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'JWT',
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});
	await app.listen(process.env.API_PORT);
	const logger = new Logger('Main');
	logger.debug('listening on ' + process.env.API_PORT);
}
bootstrap();
