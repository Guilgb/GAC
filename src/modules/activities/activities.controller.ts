import { Controller, Get, UseGuards } from '@nestjs/common';
import { ActivitiesUseCase } from './use-cases/activties.use-case';
import { AuthGuard } from '../auth/AuthMiddleware';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activities: ActivitiesUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllActivities() {
    return this.activities.getAllActivities();
  }
}
