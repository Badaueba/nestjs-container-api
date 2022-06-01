import { ApiProperty } from '@nestjs/swagger';

export class ExternalProduct {
	@ApiProperty()
	price: number;
	@ApiProperty()
	image: string;
	@ApiProperty()
	brand: string;
	@ApiProperty()
	id: string;
	@ApiProperty()
	title: string;
	@ApiProperty()
	reviewScore: number;
}
