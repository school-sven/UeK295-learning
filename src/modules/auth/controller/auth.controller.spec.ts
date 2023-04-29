import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { User } from '../../users/entity/user.entity';
import { LoginResponseDto } from '../dto/login-reponse.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        JwtService,
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            userInformation: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return a LoginResponseDto if user login is successful', async () => {
      const loginRequestDto: LoginRequestDto = {
        username: 'john_doe',
        password: 'password',
      };
      const loginResponseDto: LoginResponseDto = {
        access_token: 'test_access_token',
      };
      jest.spyOn(service, 'signIn').mockResolvedValueOnce(loginResponseDto);

      const result = await controller.signIn(loginRequestDto);

      expect(result).toEqual(loginResponseDto);
      expect(service.signIn).toHaveBeenCalledWith(
        loginRequestDto.username,
        loginRequestDto.password,
      );
    });
  });

  describe('getProfile', () => {
    it('should return a User object if user information retrieval is successful', async () => {
      const user: Partial<User> = {
        id: 1,
        firstName: 'john',
        lastName: 'doe',
        username: 'john_doe',
        password: 'password',
        isActive: true,
        created: new Date(),
        updated: new Date(),
        version: 1,
      };
      jest.spyOn(service, 'userInformation').mockResolvedValueOnce(user);

      const result = await controller.getProfile({
        user: { username: user.username },
      });

      expect(result).toEqual(user);
      expect(service.userInformation).toHaveBeenCalledWith(user.username);
    });
  });
});
