import { Controller, Post, Body, Get } from '@nestjs/common';
import { MlService } from './ml.service';
import { MlDto } from './dto';

@Controller('price')
export class MlController {
  constructor(private readonly predictionService: MlService) {}

  // http://localhost:3000/price/predict
  @Post('predict')
  async predict(@Body() dto: MlDto) {
    try {
      return this.predictionService.predictPrice(dto);
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  // http://localhost:3000/price/train
  @Get('train')
  async trainModel() {
    await this.predictionService.trainModel();
    return { message: 'Training started' };
  }
}
