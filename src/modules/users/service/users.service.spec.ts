import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneByUsername', () => {
    it('should return a user if one is found', async () => {
      const expectedUser = new User();
      expectedUser.username = 'john_doe';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(expectedUser);

      const actualUser = await service.findOneByUsername(expectedUser.username);

      expect(actualUser).toEqual(expectedUser);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        username: expectedUser.username,
      });
    });

    it('should return null if no user is found', async () => {
      const username = 'non_existent_user';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const actualUser = await service.findOneByUsername(username);

      expect(actualUser).toBeNull();
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        username,
      });
    });
  });
});
