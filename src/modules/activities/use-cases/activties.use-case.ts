import { Injectable } from '@nestjs/common';
import { ActivitieService } from '../activities.service';
import { ActivitieDTO, ActivitieSchema } from './dto/activities.dto';
import { YupValidator } from '../../../shared/validators/yup.validator';

@Injectable()
export class ActivitiesUseCase {
  constructor(private readonly service: ActivitieService) {}

  async createActivitie(activitie: ActivitieDTO) {
    try {
      await YupValidator.validate(ActivitieSchema, activitie);
      return this.service.createActivitie(activitie);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getActivitie(id: string) {
    return this.service.getActivitie(id);
  }

  async updateActivitie(id: string, activitie: ActivitieDTO) {
    try {
      await YupValidator.validate(ActivitieSchema, activitie);
      return this.service.updateActivitie(id, activitie);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteActivitie(id: string) {
    return this.service.deleteActivitie(id);
  }

  async getAllActivities() {
    return this.service.getAllActivities();
  }
}
