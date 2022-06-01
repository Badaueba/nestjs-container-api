import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class FavoriteDto {
	@ApiProperty()
	@IsString()
	@IsUUID()
	list: string;

	@ApiProperty()
	@IsString()
	@IsUUID()
	product: string;
}
