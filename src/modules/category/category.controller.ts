import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ComplementaryCategoryUseCase } from './use-cases/category.use-case';

@Controller('category')
export class ComplementaryCategoryController {
  constructor(private readonly category: ComplementaryCategoryUseCase) {}

  @Post()
  async createCategory(@Body('category') category: string) {
    return this.category.createCategory(category);
  }

  @Get()
  async getCategory() {
    return this.category.getCategory();
  }

  @Get('/:id')
  async findOne(@Param() params: { id: string }) {
    const { id } = params;
    return this.category.getCategoryById(id);
  }

  @Put(':id')
  async updateCategory(
    @Body('category') category: string,
    @Param() params: { id: string },
  ) {
    const { id } = params;
    return this.category.updateCategory(id, category);
  }

  @Delete('/:id')
  async deleteCategory(@Param() params: { id: string }) {
    const { id } = params;
    return this.category.deleteCategory(id);
  }
}
