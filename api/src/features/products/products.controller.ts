import {
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseFilters,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { CustomValidationPipe } from 'src/shared/pipes/custom-validator.pipe';
import { UUIDParamDto } from 'src/shared/ParamDto';
import { JwtGuard } from '../auth/guards/auth-jwt.guard';
import { ExternalListParams } from '../external-api/dto/list-params.dto';
import { ExternalProduct } from '../external-api/schemas/external-product';
import { ExternalProductsList } from '../external-api/schemas/external-products-list';
import { FavoriteList } from '../favourites/favorite.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@ApiBearerAuth('JWT')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtGuard)
@Controller('products')
export class ProductsController {
	constructor(private productsService: ProductsService) {}

	@Get('/list')
	@ApiOperation({
		summary: 'List',
		description: 'List available products by page',
	})
	@ApiOkResponse({
		type: ExternalProductsList,
	})
	public async getList(
		@Query(CustomValidationPipe) params: ExternalListParams,
	) {
		return this.productsService.importList(params);
	}

	@Get('/:id')
	@ApiOperation({
		summary: 'List one',
		description: 'list one product details by id',
	})
	@ApiOkResponse({
		type: ExternalProduct,
	})
	public async getOne(@Param(CustomValidationPipe) params: UUIDParamDto) {
		return this.productsService.importOne(params.id);
	}
}
