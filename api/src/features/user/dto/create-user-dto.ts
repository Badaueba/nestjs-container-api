import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsEmail()
	@ApiProperty()
	public email: string;
	@IsString()
	@MinLength(3)
	@ApiProperty()
	public address: string;
	@MinLength(6, { message: 'password requires at least 6 characters' })
	@IsString()
	@ApiProperty()
	public password: string;
	@IsString()
	@MinLength(3)
	@ApiProperty()
	public name: string;
}
