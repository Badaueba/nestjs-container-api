import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import * as typeormConfig from './database';

@Module({
	imports: [TypeOrmModule.forRoot(typeormConfig)],
	exports: [TypeOrmModule],
})
export class DatabaseModule {}
