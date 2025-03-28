import { Test, TestingModule } from '@nestjs/testing';
import { BearingService } from './bearing.service';

describe('BearingService', () => {
  let service: BearingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BearingService],
    }).compile();

    service = module.get<BearingService>(BearingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
