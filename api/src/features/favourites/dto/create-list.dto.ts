import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateListDto {
	@ApiProperty()
	@IsString()
	user: string;

	@ApiPropertyOptional({
		type: [String],
		description: 'opitional product ids',
	})
	@IsOptional()
	@IsArray()
	@IsNotEmpty()
	products?: string[];
}
