import { ApiProperty } from '@nestjs/swagger';
import { ExternalProduct } from 'src/features/external-api/schemas/external-product';
import { User } from 'src/features/user/user.entity';

export class FullFavoriteList {
	@ApiProperty()
	id: string;
	@ApiProperty({
		type: User,
	})
	user: User;

	@ApiProperty({
		type: [ExternalProduct],
	})
	products: ExternalProduct[];
}
