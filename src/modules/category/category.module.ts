import { Module } from '@nestjs/common';
import { ComplementaryCategoryController } from './category.controller';
import { ComplementaryCategoryService } from './category.service';
import { ComplementaryCategoryUseCase } from './use-cases/category.use-case';

@Module({
  providers: [ComplementaryCategoryService, ComplementaryCategoryUseCase],
  controllers: [ComplementaryCategoryController],
})
export class ComplementaryActivitiesModule {}
