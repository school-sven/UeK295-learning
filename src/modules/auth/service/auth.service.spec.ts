import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('AuthService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('signIn', () => {
    it('should return an access token if the username and password are correct', async () => {
      const expectedUser = {
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
      const expectedToken = 'test_token';
      jest
        .spyOn(usersService, 'findOneByUsername')
        .mockResolvedValue(expectedUser);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(expectedToken);

      const actualResult = await service.signIn(
        expectedUser.username,
        expectedUser.password,
      );
      expect(actualResult.access_token).toEqual(expectedToken);
      expect(usersService.findOneByUsername).toHaveBeenCalledWith(
        expectedUser.username,
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        username: expectedUser.username,
        sub: expectedUser.id,
      });
    });

    it('should throw an UnauthorizedException if the password is incorrect', async () => {
      const expectedUser = {
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
      jest
        .spyOn(usersService, 'findOneByUsername')
        .mockResolvedValue(expectedUser);

      await expect(
        service.signIn(expectedUser.username, 'wrong_password'),
      ).rejects.toThrow(UnauthorizedException);
      expect(usersService.findOneByUsername).toHaveBeenCalledWith(
        expectedUser.username,
      );
    });

    it('should throw an UnauthorizedException if the username does not exist', async () => {
      jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue(null);

      await expect(
        service.signIn('non_existent_user', 'test_password'),
      ).rejects.toThrow(UnauthorizedException);
      expect(usersService.findOneByUsername).toHaveBeenCalledWith(
        'non_existent_user',
      );
    });
  });
});
