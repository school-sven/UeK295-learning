import { Test, TestingModule } from '@nestjs/testing';
import { RootController } from './root.controller';
import { RootService } from '../service/root.service';

describe('RootController', () => {
  let appController: RootController;
  let appService: RootService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
      providers: [
        {
          provide: RootService,
          useValue: {
            getHello: jest.fn().mockReturnValue('Hello World!'),
            getHealthCheck: jest.fn().mockReturnValue('healthy!'),
            getVersion: jest.fn().mockReturnValue('1.0.6'),
            getAwait: jest.fn().mockResolvedValue('Await 2s!'),
          },
        },
      ],
    }).compile();
    appController = app.get<RootController>(RootController);
    appService = app.get<RootService>(RootService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should log corrId', () => {
      const spy = jest.spyOn(appController, 'getHello');
      appController.getHello('corrId');
      expect(spy).toHaveBeenCalledWith('corrId');
    });

    it('should return "Hello World!"', () => {
      expect(appController.getHello('corrId')).toBe('Hello World!');
    });
  });

  describe('getHealthCheck', () => {
    it('should return "healthy!"', () => {
      expect(appController.getHealthCheck()).toBe('healthy!');
    });
  });

  describe('getVersion', () => {
    it('should return "1.0.6"', () => {
      expect(appController.getVersion()).toBe('1.0.6');
    });
  });

  describe('getAwait', () => {
    it('should return "Await 2s!"', async () => {
      expect(await appController.getAwait()).toBe('Await 2s!');
    });
  });
});
