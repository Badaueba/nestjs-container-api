import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const typeormConfig: TypeOrmModuleOptions = {
	name: 'default',
	type: 'mysql',
	host: process.env.MYSQL_HOST,
	port: +process.env.MYSQL_PORT,
	username: process.env.MYSQL_ROOT,
	password: process.env.MYSQL_ROOT_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
	migrations: [join(__dirname, '../migrations/*{.ts, .js}')],
	synchronize: false,
	migrationsRun: true,
	retryAttempts: 3,
};

export = typeormConfig;
