import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { ProductsModule } from './features/products/products.module';
import { FavoritesModule } from './features/favourites/favorites.module';
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.MYSQL_HOST,
			port: +process.env.MYSQL_PORT,
			username: process.env.MYSQL_ROOT,
			password: process.env.MYSQL_ROOT_PASSWORD,
			database: process.env.MYSQL_DATABASE,
			entities: [__dirname + '/**/*.entity.{js,ts}'],
			autoLoadEntities: true,
			synchronize: false,
		}),
		AuthModule,
		UserModule,
		ProductsModule,
		FavoritesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
