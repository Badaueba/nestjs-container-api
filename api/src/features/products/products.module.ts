import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ExternalApiModule } from '../external-api/external-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRespository } from './product.repository';

@Module({
	providers: [ProductsService],
	controllers: [ProductsController],
	imports: [
		ExternalApiModule,
		TypeOrmModule.forFeature([ProductRespository]),
	],
	exports: [ProductsService],
})
export class ProductsModule {}
