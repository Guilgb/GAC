import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDTO } from './use-cases/dto/user.dto';
import { UserUseCase } from './use-cases/user.use-case';
import { CourseDTO } from './use-cases/dto/course.dto';
import { ActivitiesDTO } from './use-cases/dto/activities.dto';
import { AuthGuard } from '../auth/AuthMiddleware';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @UseGuards(AuthGuard)
  @Get('/allCourses')
  async getAllCourses() {
    return this.userUseCase.allCourses();
  }

  @UseGuards(AuthGuard)
  @Get('/info')
  async getUserInfo(@Req() req) {
    const user = req.user;
    const userInfo = await this.userUseCase.getUserInfo(user.email);
    return {
      name: userInfo.name,
      email: userInfo.email,
      isAdmin: userInfo.isAdmin,
      registration: userInfo.registration,
      permissions: userInfo.permissions,
    };
  }

  @Post()
  async createUser(@Body() createUser: UserDTO) {
    return this.userUseCase.createUser(createUser);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.userUseCase.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async remove(@Param() params: { id: string }) {
    const { id } = params;
    return this.userUseCase.removeUser(id);
  }
  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(@Param() params: { id: string }, @Body() updateUser: UserDTO) {
    const { id } = params;
    return this.userUseCase.updateUser(id, updateUser);
  }
  @UseGuards(AuthGuard)
  @Post('/:id/course')
  async createCourse(
    @Param() params: { id: string },
    @Body() createCourse: CourseDTO,
  ) {
    const { id } = params;
    return this.userUseCase.createCourse(id, createCourse);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id/course/:courseId')
  async deleteStudy(@Param() params: { id: string; courseId: string }) {
    const { id, courseId } = params;
    return this.userUseCase.removeCourse(id, courseId);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/course/:courseId')
  async updateCourse(
    @Param() params: { id: string; courseId: string },
    @Body() updateCourse: CourseDTO,
  ) {
    const { id, courseId } = params;
    return this.userUseCase.updateCourse(id, courseId, updateCourse);
  }

  @UseGuards(AuthGuard)
  @Get('/:id/course')
  async getAllCoursesForUser(@Param() params: { id: string }) {
    const { id } = params;
    return this.userUseCase.getAllCoursesForUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('/:id/course/:courseId')
  async getStudyById(@Param() params: { id: string; courseId: string }) {
    const { id, courseId } = params;
    return this.userUseCase.getCourseById(id, courseId);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/activities')
  @UseInterceptors(FileInterceptor('file'))
  async createActivities(
    @Param() params: { id: string },
    @Body() activities: ActivitiesDTO,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    const { id } = params;
    return this.userUseCase.createActivities(id, activities, file);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id/activities/:activitiesId')
  async deleteActivities(
    @Param() params: { id: string; activitiesId: string },
  ) {
    const { id, activitiesId } = params;
    return this.userUseCase.removeActivities(id, activitiesId);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/activities/:activitiesId')
  @UseInterceptors(FileInterceptor('file'))
  async updateActivities(
    @Param() params: { id: string; activitiesId: string },
    @Body() activities: ActivitiesDTO,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    const { id, activitiesId } = params;
    return this.userUseCase.updateActivities(
      id,
      activitiesId,
      activities,
      file,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/:id/activities')
  async getAllActivitiesForUser(@Param() params: { id: string }) {
    const { id } = params;
    return this.userUseCase.getAllActivitiesForUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('/:id/activities/:activitiesId')
  async getActivitiesById(
    @Param() params: { id: string; activitiesId: string },
  ) {
    const { id, activitiesId } = params;
    return this.userUseCase.getActivityById(id, activitiesId);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/activities/:activitiesId/category/:categoryId')
  async createCategory(
    @Param() params: { id: string; activitiesId: string; categoryId: string },
  ) {
    const { id, activitiesId, categoryId } = params;
    return this.userUseCase.createCategory(id, activitiesId, categoryId);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id/activities/:activitiesId/category/:categoryId')
  async removeCategory(
    @Param() params: { id: string; activitiesId: string; categoryId: string },
  ) {
    const { id, activitiesId, categoryId } = params;
    return this.userUseCase.removeCategory(id, activitiesId, categoryId);
  }

  @UseGuards(AuthGuard)
  @Get('/:id/activities/:activitiesId/category')
  async listCategories(@Param() params: { id: string; activitiesId: string }) {
    const { id, activitiesId } = params;
    return this.userUseCase.listCategories(id, activitiesId);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async finOne(@Param() params: { id: string }) {
    const { id } = params;
    return this.userUseCase.findOneUser(id);
  }
}
