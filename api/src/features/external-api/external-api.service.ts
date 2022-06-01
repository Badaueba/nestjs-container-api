import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';
import * as AxiosLogger from 'axios-logger';
import { AxiosError } from 'axios';
import { ExternalListParams } from './dto/list-params.dto';
import { ExternalProductsList } from './schemas/external-products-list';
import { ExternalProduct } from './schemas/external-product';

@Injectable()
export class ExternalApiService {
	constructor(private httpService: HttpService) {
		this.httpService.axiosRef.interceptors.request.use(
			AxiosLogger.requestLogger,
			AxiosLogger.errorLogger,
		);

		this.httpService.axiosRef.interceptors.response.use(
			(response) =>
				AxiosLogger.responseLogger(response, {
					status: true,
					data: false,
					statusText: true,
				}),
			AxiosLogger.errorLogger,
		);
	}

	/*
		- Listagem de produtos da api de testes por página
	*/

	public async getList(params: ExternalListParams) {
		try {
			const list$ = this.httpService
				.get<ExternalProductsList>(`?page=${params.page || 1}`)
				.pipe(map((response) => response.data));
			const list = await lastValueFrom(list$);
			return list;
		} catch (e) {
			this.handleError(e);
		}
	}

	/*
		- Lista os detalhes do produto da api de testes
		- acho que encontrei um bug nessa rota
		- caso seja chamado /product/1/ ele retorna a listagem de paginas

	*/

	public async getOne(id: string) {
		try {
			const product$ = this.httpService
				.get<ExternalProduct>(`${id}/`)
				.pipe(map((response) => response.data));
			const product = await lastValueFrom(product$);
			return product;
		} catch (e) {
			this.handleError(e);
		}
	}

	handleError(e: AxiosError) {
		throw new HttpException(
			e.response.statusText,
			e.response.status || HttpStatus.SERVICE_UNAVAILABLE,
		);
	}
}
