import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ProductsModule } from '../products/products.module';
import { FavoriteList } from './favorite.entity';

@Module({
	providers: [FavoritesService],
	controllers: [FavoritesController],
	imports: [
		TypeOrmModule.forFeature([FavoriteList]),
		UserModule,
		ProductsModule,
	],
	exports: [FavoritesService, TypeOrmModule],
})
export class FavoritesModule {}
