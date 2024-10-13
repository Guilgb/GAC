// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { FirestoreService } from '../db/services/firestore.service';
import { UserController } from './user.controller';
import { UserUseCase } from './use-cases/user.use-case';
import { FirebaseModule } from '../db/firestore.module';
import { ConfigService } from '@nestjs/config';
import { ActivitieService } from '../activities/activities.service';

@Module({
  imports: [FirebaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'FirestoreService',
      useClass: FirestoreService,
    },
    {
      provide: 'ActivitieService',
      useClass: ActivitieService,
    },
    UserUseCase,
    ConfigService,
  ],
})
export class UserModule {}
