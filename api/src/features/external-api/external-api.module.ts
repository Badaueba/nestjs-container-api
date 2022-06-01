import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalApiService } from './external-api.service';

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
