import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ExternalApiModule } from '../external-api/external-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProducts } from './favorite-products.entity';

@Module({
	providers: [ProductsService],
	controllers: [ProductsController],
	imports: [TypeOrmModule.forFeature([FavoriteProducts]), ExternalApiModule],
	exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
