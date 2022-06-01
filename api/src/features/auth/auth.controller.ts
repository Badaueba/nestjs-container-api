import {
	Body,
	Controller,
	Post,
	UseGuards,
	Request,
	UseFilters,
	ClassSerializerInterceptor,
	UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { CustomValidationPipe } from 'src/shared/pipes/custom-validator.pipe';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { SigninUserDTO } from '../user/dto/signin-user-dto';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/auth-local.guard';
import { AuthUser } from './schemas/auth-user';

@ApiTags('Auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/signin')
	@UseGuards(LocalGuard)
	@ApiOperation({
		summary: 'Login',
		description: 'Authenticates the user',
	})
	@ApiBody({
		type: SigninUserDTO,
	})
	@ApiOkResponse({
		type: Object,
	})
	public signin(
		@Body(new CustomValidationPipe()) body: SigninUserDTO,
		@Request() req: any,
	): Promise<AuthUser> {
		const { user } = req;
		return this.authService.signin(user as User);
	}

	@Post('/signup')
	@ApiOperation({
		summary: 'Register',
		description: 'register new users',
	})
	@ApiOkResponse({ type: User })
	public signup(@Body(new CustomValidationPipe()) data: CreateUserDto) {
		return this.authService.signup(data);
	}
}
