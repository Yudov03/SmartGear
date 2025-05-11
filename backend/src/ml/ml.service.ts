import { Injectable } from '@nestjs/common';
import { RandomForestRegression } from 'ml-random-forest';
import { MlDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MlService {
  constructor(private prisma: PrismaService) {}
  private model: RandomForestRegression | null = null;

  async trainModel() {
    this.model = new RandomForestRegression({
      seed: 3,
      maxFeatures: 2,
      replacement: false,
      nEstimators: 200,
    });
    const dataset = [
      [10.5, 65, 9, 4563000],
      [8.5, 75, 8, 5190000],
      [7.5, 85, 9, 2381000],
      [8.0, 75, 9, 3450000],
      [10.0, 65, 8, 4117000],
      [9.5, 70, 9, 3338000],
      [9.0, 65, 8, 2924000],
      [8.8, 70, 8, 3772000],
    ];
    const trainingSet = new Array(dataset.length);
    const predictions = new Array(dataset.length);
    for (let i = 0; i < dataset.length; ++i) {
      trainingSet[i] = dataset[i].slice(0, 3);
      predictions[i] = dataset[i][3];
    }
    try {
      this.model.train(trainingSet, predictions);
    } catch (error) {
      console.error('Training error:', error);
      throw new Error('Failed to train model');
    }
  }

  async predictPrice(dto: MlDto) {
    if (!this.model) {
      this.trainModel();
      if (!this.model) {
        throw new Error('Model is not trained yet');
      }
    }
    try {
      const input = new Array([dto.P, dto.n, dto.L]);
      const prediction = this.model.predict(input);
      return prediction;
    } catch (error) {
      console.error('Prediction error:', error);
      throw new Error('Prediction failed');
    }
  }
}
