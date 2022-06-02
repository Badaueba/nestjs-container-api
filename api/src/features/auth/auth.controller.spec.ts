import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
	let controller: AuthController;

	let authService: AuthService;

	const fakeUser = { name: 'alan', email: 'alan@test.com', id: 1 };
	const fakeAccess_token = '0039004040a000230d00230s';

	const fakeSignup = () => {
		return Promise.resolve(fakeUser);
	};

	const fakeSignin = () => {
		return Promise.resolve({
			access_token: fakeAccess_token,
		});
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						signup: jest.fn().mockImplementation(fakeSignup),
						signin: jest.fn().mockImplementation(fakeSignin),
					},
				},
			],
			imports: [],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should do singup', async () => {
		await expect(
			controller.signup({
				name: 'alan',
				address: 'rua',
				email: 'alan@test.com',
				password: '123',
			}),
		).resolves.toEqual(fakeUser);
	});

	it('should do sinin', async () => {
		await expect(
			controller.signin(
				{
					email: 'alan@test.com',
					password: '123',
				},
				{},
			),
		).resolves.toEqual({ access_token: fakeAccess_token });
	});
});
