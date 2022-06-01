import {
	Controller,
	Get,
	UseGuards,
	Request,
	Post,
	Body,
	Param,
	Put,
	Delete,
	UseFilters,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/auth-jwt.guard';
import { CustomValidationPipe } from 'src/shared/pipes/custom-validator.pipe';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { User } from './user.entity';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('users')
@UseGuards(JwtGuard)
@UseFilters(HttpExceptionFilter)
export class UserController {
	constructor(private userService: UserService) {}

	@Get('/')
	@ApiOperation({
		summary: 'list',
		description: 'Show all users',
	})
	@ApiOkResponse({
		type: Object,
	})
	public async get() {
		return this.userService.showAll();
	}

	@Post('/')
	@ApiOperation({
		summary: 'create',
		description: 'Creates a new user',
	})
	@ApiBody({
		type: CreateUserDto,
	})
	@ApiOkResponse({
		type: User,
	})
	public async create(@Body(CustomValidationPipe) data: CreateUserDto) {
		return this.userService.create(data);
	}

	@Put('/:id')
	@ApiOperation({
		summary: 'update',
		description: 'Updates a given user',
	})
	@ApiOkResponse({
		type: Boolean,
	})
	public async update(
		@Param('id') id: string,
		@Body(new CustomValidationPipe()) data: UpdateUserDto,
	) {
		return this.userService.update(id, data);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'delete',
		description: 'Removes a given user',
	})
	@ApiOkResponse({
		type: Boolean,
	})
	public async remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}

	@Get('/me')
	@ApiOperation({
		summary: 'show me',
		description: 'show the current logged user',
	})
	@ApiOkResponse({
		type: User,
	})
	public async me(@Request() req) {
		const userRef = req.user;
		return this.userService.findById(userRef.id);
	}
}
