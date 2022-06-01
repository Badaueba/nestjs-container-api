import { ApiProperty } from '@nestjs/swagger';
import { ExternalProduct } from './external-product';

class MetaList {
	@ApiProperty()
	page_number: number;
	@ApiProperty()
	page_size: number;
}

export class ExternalProductsList {
	@ApiProperty({ type: MetaList })
	meta: MetaList;
	@ApiProperty({
		type: [ExternalProduct],
	})
	products: ExternalProduct[];
}
