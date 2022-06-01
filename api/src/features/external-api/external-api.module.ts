import { Module } from '@nestjs/common';
import { ExternalApiService } from './providers/external-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
	providers: [ExternalApiService],
	imports: [
		HttpModule.register({
			baseURL: process.env.EXTERNAL_PRODUCTS_API,
		}),
	],
	exports: [ExternalApiService],
})
export class ExternalApiModule {}
