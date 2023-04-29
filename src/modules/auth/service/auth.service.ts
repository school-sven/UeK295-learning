import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entity/user.entity';
import { UsersService } from '../../users/service/users.service';
import { LoginResponseDto } from '../dto/login-reponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findOneByUsername(username);
    if (user?.password !== pass || !pass) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async userInformation(username: string): Promise<Partial<User>> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, isActive, ...result } = user;
    return result;
  }
}
