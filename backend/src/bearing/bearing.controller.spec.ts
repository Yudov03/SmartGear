import { Test, TestingModule } from '@nestjs/testing';
import { BearingController } from './bearing.controller';

describe('BearingController', () => {
  let controller: BearingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BearingController],
    }).compile();

    controller = module.get<BearingController>(BearingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
