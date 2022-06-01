import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	HttpStatus,
	BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
		const { metatype } = metadata;

		if (!value || (value instanceof Object && this.isEmpty(value))) {
			throw new BadRequestException({
				code: HttpStatus.BAD_REQUEST,
				message: 'Empty object passed',
			});
		}

		if (!metatype || !this.toValidate(metatype)) {
			throw new BadRequestException({
				code: HttpStatus.BAD_REQUEST,
				message: 'No data passed to the request',
			});
		}
		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			throw new BadRequestException({
				code: HttpStatus.BAD_REQUEST,
				message: this.formatErrors(errors),
			});
		}

		return value;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [
			String,
			Boolean,
			Number,
			Array,
			Object,
			Function,
		];
		return !types.includes(metatype);
	}

	private formatErrors(errors: any[]) {
		return errors
			.map((err) => {
				for (const property in err.constraints) {
					return `${err.constraints[property]}`;
				}
			})
			.join(', ');
	}
	private isEmpty(value: any) {
		if (Object.keys(value).length > 0) {
			return false;
		}
		return true;
	}
}
