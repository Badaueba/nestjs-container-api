import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { mockUser } from './user.service.spec';

describe('UserController', () => {
	let controller: UserController;

	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: {
						findByEmail: jest.fn().mockResolvedValue(mockUser),
						findById: jest.fn().mockResolvedValue(mockUser),
					},
				},
			],
		}).compile();

		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return user', async () => {
		await expect(controller.me({ user: { id: '1' } })).resolves.toEqual(
			mockUser,
		);
	});
});
