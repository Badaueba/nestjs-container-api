import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninUserDTO {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	public email: string;
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	public password: string;
}
