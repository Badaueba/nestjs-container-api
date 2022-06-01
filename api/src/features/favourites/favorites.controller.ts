import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseFilters,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { CustomValidationPipe } from 'src/shared/pipes/custom-validator.pipe';
import { UUIDParamDto } from 'src/shared/ParamDto';
import { JwtGuard } from '../auth/guards/auth-jwt.guard';
import { FavoriteDto } from '../products/dto/favorite.dto';
import { FavoriteProducts } from '../products/favorite-products.entity';
import { CreateListDto } from './dto/create-list.dto';
import { FavoriteList } from './favorite.entity';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorite List')
@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('favourites')
export class FavoritesController {
	constructor(private favoritesService: FavoritesService) {}

	@Get('/')
	@ApiOperation({
		summary: 'List all',
		description: 'Lists all favorite lists',
	})
	@ApiOkResponse({
		type: [FavoriteList],
	})
	public async listAll() {
		return this.favoritesService.listAll();
	}

	@Get('/:id')
	@ApiOperation({
		summary: 'List one detailed',
		description: 'Lists one favorite list',
	})
	@ApiOkResponse({
		type: FavoriteList,
	})
	public async listDetailed(@Param('id') id: string) {
		return this.favoritesService.listDetailed(id);
	}

	@Post('/')
	@ApiOperation({
		summary: 'Create Favorite list',
		description: 'Creates a new favorite list for a given user',
	})
	@ApiBody({
		type: CreateListDto,
	})
	@ApiOkResponse({
		type: FavoriteList,
	})
	public create(@Body(CustomValidationPipe) data: CreateListDto) {
		return this.favoritesService.create(data);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Delete one',
		description: 'Deletes one favorite list',
	})
	@ApiOkResponse({
		type: FavoriteList,
	})
	public delete(@Param(CustomValidationPipe) params: UUIDParamDto) {
		return this.favoritesService.deleteList(params.id);
	}

	@Post('/add')
	@ApiOperation({
		summary: 'Add product',
		description: 'Add a product to an existing list',
	})
	@ApiBody({
		type: FavoriteDto,
	})
	@ApiOkResponse({
		type: FavoriteProducts,
	})
	public addItems(@Body(CustomValidationPipe) data: FavoriteDto) {
		return this.favoritesService.addItems(data);
	}

	@Post('/remove')
	@ApiOperation({
		summary: 'Remove product',
		description: 'Removes a product from a list',
	})
	@ApiBody({
		type: FavoriteDto,
	})
	@ApiOkResponse({
		type: Boolean,
	})
	public removeItems(@Body(CustomValidationPipe) data: FavoriteDto) {
		return this.favoritesService.removeItems(data);
	}
}
