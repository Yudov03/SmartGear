import { Module } from '@nestjs/common';
import { BearingController } from './bearing.controller';
import { BearingService } from './bearing.service';

@Module({
  controllers: [BearingController],
  providers: [BearingService]
})
export class BearingModule {}
