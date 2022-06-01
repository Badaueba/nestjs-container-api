import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteListRepository } from './favorite.repository';
import { UserModule } from '../user/user.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ProductsModule } from '../products/products.module';

@Module({
	providers: [FavoritesService],
	controllers: [FavoritesController],
	imports: [
		TypeOrmModule.forFeature([FavoriteListRepository]),
		UserModule,
		ProductsModule,
	],
})
export class FavoritesModule {}
