import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

const mockUser = {
	name: 'alan',
	email: 'alan@test.com',
};

const mockToken = 'aaaa';

describe('AuthService', () => {
	let service: AuthService;
	let userService: UserService;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UserService,
					useValue: {
						showUser: jest.fn().mockResolvedValue(mockUser),
						create: jest.fn().mockResolvedValue(mockUser),
					},
				},
				{
					provide: JwtService,
					useValue: {
						sign: jest.fn().mockResolvedValue(mockToken),
					},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		userService = module.get<UserService>(UserService);
		jwtService = module.get<JwtService>(JwtService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should be validate user', async () => {
		await expect(service.validate('alan@test.com', '123')).resolves.toEqual(
			mockUser,
		);
	});
});
