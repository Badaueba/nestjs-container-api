import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumberString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ExternalListParams {
	@ApiProperty()
	@IsOptional()
	@Transform((data) => Number(data.value))
	@IsInt()
	page?: number;
}
