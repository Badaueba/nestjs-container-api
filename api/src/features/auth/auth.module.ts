import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalGuard } from './guards/auth-local.guard';
import { LocalStrategy } from './strategies/auth-local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/auth-jwt.strategy';

@Module({
	providers: [AuthService, LocalGuard, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: process.env.JWT_EXPIRES },
		}),
	],
})
export class AuthModule {}
