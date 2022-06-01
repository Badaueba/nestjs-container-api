import { Module } from '@nestjs/common';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { ProductsModule } from './features/products/products.module';
import { FavoritesModule } from './features/favourites/favorites.module';
import { DatabaseModule } from './config/database.module';

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		UserModule,
		ProductsModule,
		FavoritesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
