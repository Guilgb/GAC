import { Module } from '@nestjs/common';
import { ActivitieService } from './activities.service';
import { ActivitiesUseCase } from './use-cases/activties.use-case';
import { ActivitiesController } from './activities.controller';

@Module({
  providers: [ActivitieService, ActivitiesUseCase],
  controllers: [ActivitiesController],
  exports: [ActivitieService, ActivitiesUseCase],
})
export class ActivitiesModule {}
