import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

export const mockUser = new User({
	email: 'alan@teste.com',
	name: 'alan',
});

describe('UserService', () => {
	let service: UserService;

	let repository: Repository<User>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						findOne: jest.fn(),
						find: jest.fn(),
						save: jest.fn(),
						delete: jest.fn(),
						update: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
		repository = module.get<Repository<User>>(getRepositoryToken(User));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create user', async () => {
		jest.spyOn(repository, 'save').mockResolvedValueOnce(mockUser);

		await expect(
			service.create({
				email: 'alan@teste.com',
				password: '123321',
				name: 'alan',
				address: 'rua 1',
			}),
		).resolves.toEqual(mockUser);
	});

	it('should list users', async () => {
		jest.spyOn(repository, 'find').mockResolvedValueOnce([mockUser]);

		await expect(service.showAll()).resolves.toEqual([mockUser]);
	});
});
