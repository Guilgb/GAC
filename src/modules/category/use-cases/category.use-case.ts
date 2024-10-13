import { Injectable } from '@nestjs/common';
import { ComplementaryCategoryService as ComplementaryCategoryService } from '../category.service';

@Injectable()
export class ComplementaryCategoryUseCase {
  constructor(private readonly service: ComplementaryCategoryService) {}

  async createCategory(category: string) {
    return this.service.createCategory(category);
  }

  async getCategory() {
    return this.service.getComplementaryCategoryService();
  }

  async getCategoryById(id: string) {
    return this.service.getComplementaryCategoryByIdService(id);
  }

  async deleteCategory(id: string) {
    return this.service.deleteComplementaryCategoryService(id);
  }

  async updateCategory(id: string, category: string) {
    return this.service.updateComplementaryCategoryService(id, category);
  }
}
