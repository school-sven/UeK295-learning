import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from 'src/constants/constants';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: Constants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
