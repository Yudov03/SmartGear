//app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { BuildModule } from './build/build.module';
import { CatalogModule } from './catalog/catalog.module';
import { ChatModule } from './chat/chat.module';
import { MlModule } from './ml/ml.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, PrismaModule, ProjectModule, ConfigModule.forRoot({isGlobal: true}), BuildModule, CatalogModule, ChatModule, MlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
