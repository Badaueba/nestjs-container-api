import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@IsEmail()
	@ApiProperty()
	public email: string;

	@IsOptional()
	@IsString()
	@MinLength(3)
	@ApiProperty()
	public address: string;

	@IsOptional()
	@MinLength(6)
	@IsString()
	@ApiProperty()
	public password: string;

	@IsOptional()
	@IsString()
	@MinLength(3)
	@ApiProperty()
	public name: string;
}
