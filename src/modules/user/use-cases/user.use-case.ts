import { UserDTO, ValidateSchema } from './dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { FirestoreService } from '../../db/services/firestore.service';
import { YupValidator } from '../../../shared/validators/yup.validator';
import { CourseDTO, CourseSchema } from './dto/course.dto';
import { ActivitiesDTO } from './dto/activities.dto';

@Injectable()
export class UserUseCase {
  constructor(
    @Inject('FirestoreService')
    private readonly firestoreService: FirestoreService,
  ) {}

  async createUser(createUser: UserDTO) {
    await YupValidator.validate(ValidateSchema, createUser);
    return this.firestoreService.createUser(createUser);
  }

  async getUserInfo(email: string) {
    return this.firestoreService.getUserInfo(email);
  }
  async findAllUsers() {
    return this.firestoreService.findAllUsers();
  }

  async findOneUser(id: string) {
    return this.firestoreService.findOneUser(id);
  }

  async removeUser(id: string) {
    return this.firestoreService.removeUser(id);
  }

  async updateUser(id: string, updateUser: UserDTO) {
    return this.firestoreService.updateUser(id, updateUser);
  }

  async createCourse(userId: string, course: CourseDTO) {
    await YupValidator.validate(CourseSchema, course);
    return this.firestoreService.createCourse(userId, course);
  }

  async removeCourse(userId: string, courseId: string) {
    return this.firestoreService.removeCourse(userId, courseId);
  }

  async updateCourse(userId: string, courseId: string, course: CourseDTO) {
    return this.firestoreService.updateCourse(userId, courseId, course);
  }

  async getAllCoursesForUser(userId: string) {
    return this.firestoreService.getAllCoursesForUser(userId);
  }

  async getCourseById(userId: string, courseId: string) {
    return this.firestoreService.getCourseById(userId, courseId);
  }

  async allCourses(): Promise<CourseDTO[]> {
    return this.firestoreService.allCourse();
  }

  async createActivities(userId: string, activities: ActivitiesDTO, file: any) {
    try {
      return this.firestoreService.createActivities(userId, activities, file);
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeActivities(userId: string, activitiesId: string) {
    return this.firestoreService.removeActivities(userId, activitiesId);
  }

  async updateActivities(
    userId: string,
    activitiesId: string,
    activities: ActivitiesDTO,
    file?: any,
  ) {
    return this.firestoreService.updateActivities(
      userId,
      activitiesId,
      activities,
      file,
    );
  }

  async addCommentToActivities(
    userId: string,
    activitiesId: string,
    comment: string,
  ) {
    return this.firestoreService.addCommentToActivities(
      userId,
      activitiesId,
      comment,
    );
  }

  async getAllActivitiesForUser(userId: string) {
    return this.firestoreService.getAllActivitiesForUser(userId);
  }

  async getActivityById(userId: string, activitiesId: string) {
    return this.firestoreService.getActivityById(userId, activitiesId);
  }

  async createCategory(
    userId: string,
    activitiesId: string,
    categoryId: string,
  ) {
    return this.firestoreService.addCategoryToActivity(
      userId,
      activitiesId,
      categoryId,
    );
  }

  async removeCategory(
    userId: string,
    activitiesId: string,
    categoryId: string,
  ) {
    return this.firestoreService.removeCategoryFromActivity(
      userId,
      activitiesId,
      categoryId,
    );
  }

  async listCategories(userId: string, activitiesId: string) {
    return this.firestoreService.listCategoriesForActivity(
      userId,
      activitiesId,
    );
  }
}
