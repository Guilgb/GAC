import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { firestore } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { UserDTO, UserReponse } from '../../user/use-cases/dto/user.dto';
import { UpdateData } from '@google-cloud/firestore';
import { Storage } from '@google-cloud/storage';
import { CourseDTO } from '../../user/use-cases/dto/course.dto';
import { ActivitiesDTO } from '../../user/use-cases/dto/activities.dto';
import { ActivitieService } from 'src/modules/activities/activities.service';

@Injectable()
export class FirestoreService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private storage: Storage;

  constructor(
    @Inject(REQUEST) private readonly request: { user: any },
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
    @Inject('ActivitieService')
    private readonly activitieService: ActivitieService,
  ) {
    this.collection = firestore().collection('user');
    this.storage = new Storage();
  }

  async getUserInfo(email: string): Promise<UserDTO> {
    try {
      const userDoc = await this.collection.where('email', '==', email).get();
      console.log(userDoc.docs[0].data());
      if (!userDoc.docs[0].data()) {
        throw new Error('Erro ao encontrar o usuário');
      }
      return userDoc.docs[0].data() as UserDTO;
    } catch (error) {
      throw new Error('Erro ao encontrar o usuário');
    }
  }

  async createUser(createUser: UserDTO) {
    const { email, password } = createUser;

    const userRecord = await this.firebaseAdmin.auth().createUser({
      email,
      password,
    });

    const userC = {
      iud: userRecord.uid,
      courses: [],
      activities: [],
      isAdmin: createUser.isAdmin || false,
      ...createUser,
    };
    const user: Omit<UserDTO, 'id'> = {
      ...userC,
    };
    return this.collection.add(user).then((doc) => {
      return { id: doc.id, ...user };
    });
  }

  async findAllUsers() {
    const users = await this.collection.get();
    return users.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOneUser(id: string): Promise<UserReponse> {
    try {
      const user = await this.collection.doc(id).get();
      const userResponse = user.data();
      return {
        activities: userResponse.activities,
        permissions: userResponse.permissions,
        name: userResponse.name,
        registration: userResponse.registration,
        email: userResponse.email,
        modality: userResponse.modality,
        level: userResponse.level,
        institutionName: userResponse.institutionName,
        workload: userResponse.workload,
        studyArea: userResponse.studyArea,
        courses: userResponse.courses,
      };
    } catch (error) {
      throw new Error('Erro ao encontrar o usuário');
    }
  }

  async removeUser(id: string) {
    try {
      const userDelete = await this.collection.doc(id).delete();
      return userDelete;
    } catch (error) {
      throw new Error('Erro ao remover o usuário');
    }
  }

  async updateUser(id: string, updateUser: UpdateData<UserDTO>) {
    try {
      await this.collection.doc(id).update(updateUser);
    } catch (error) {
      throw new Error('Erro ao atualizar o usuário');
    }
  }

  async createCourse(userId: string, study: CourseDTO) {
    try {
      const userRef = this.collection.doc(userId);
      const courseId = firestore().collection('course').doc().id;

      const courseWithId: CourseDTO = { id: courseId, ...study };
      await userRef
        .update({
          courses: admin.firestore.FieldValue.arrayUnion(courseWithId),
        })
        .then(() => {
          return userRef.get().then((doc) => {
            const user = doc.data() as UserDTO;
            return {
              id: doc.id,
              ...user,
            };
          });
        });
      const updatedUserDoc = await userRef.get();
      const updatedUser = updatedUserDoc.data() as UserDTO;
      return {
        id: updatedUserDoc.id,
        ...updatedUser,
        message: 'Curso criado com sucesso',
      };
    } catch (error) {
      throw new Error(`Erro ao criar curso para o usuário ${userId}: ${error}`);
    }
  }

  async removeCourse(userId: string, courseId: string) {
    try {
      const userRef = this.collection.doc(userId);

      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const user = userDoc.data() as UserDTO;
      const courseToRemove = user.courses.find(
        (course) => course.id === courseId,
      );

      if (!courseToRemove) {
        throw new Error('Curso não existe');
      }
      await userRef.update({
        courses: admin.firestore.FieldValue.arrayRemove(courseToRemove),
      });

      return { id: userId, courses: courseToRemove, message: 'Curso removido' };
    } catch (error) {
      throw new Error(
        `Erro ao remover estudo para o usuário ${userId}: ${error}`,
      );
    }
  }

  async updateCourse(userId: string, courseId: string, course: CourseDTO) {
    try {
      const userRef = this.collection.doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('Usuário não existe');
      }

      const user = userDoc.data() as UserDTO;
      const studyToUpdate = user.courses.find((study) => study.id === courseId);

      if (!studyToUpdate) {
        throw new Error('Curso não existe');
      }

      await userRef.update({
        courses: admin.firestore.FieldValue.arrayRemove(studyToUpdate),
      });

      await userRef.update({
        courses: admin.firestore.FieldValue.arrayUnion(course),
      });

      return { id: userId, courses: course };
    } catch (error) {
      throw new Error(
        `Erro ao atualizar estudo para o usuário ${userId}: ${error}`,
      );
    }
  }

  async getAllCoursesForUser(userId: string) {
    const userRef = this.collection.doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }
    const user = userDoc.data() as UserDTO;
    return user.courses;
  }

  async getCourseById(userId: string, courseId: string) {
    try {
      const userRef = this.collection.doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const user = userDoc.data() as UserDTO;
      const study = user.courses.find((course) => course.id === courseId);

      if (!study) {
        throw new Error('Study not found');
      }

      return study;
    } catch (error) {
      throw new Error(
        `Erro ao encontrar estudo para o usuário ${userId}: ${error}`,
      );
    }
  }

  async allCourse(): Promise<CourseDTO[]> {
    const usersSnapshot = await this.collection.get();
    const allCourses: CourseDTO[] = [];
    usersSnapshot.forEach((userDoc) => {
      const user = userDoc.data() as UserDTO;
      if (user.courses) {
        allCourses.push(...user.courses);
      }
    });

    return allCourses;
  }

  async createActivities(userId: string, activities: ActivitiesDTO, file: any) {
    try {
      const userRef = this.collection.doc(userId);

      if (!file) {
        throw new Error('File not found');
      }

      const bucket = admin.storage().bucket();
      const fileUpload = bucket.file(file.originalname);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      const fileUrl = await new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          reject(err);
        });
        let publicUrl = '';
        blobStream.on('finish', async () => {
          publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
          resolve({ fileUrl: publicUrl });
        });

        blobStream.end(file.buffer);
        return { fileUrl: publicUrl };
      });

      activities.file = (fileUrl as { fileUrl: string }).fileUrl;

      const activitiesCollection =
        await this.activitieService.createActivitie(activities);
      await userRef
        .update({
          activities:
            admin.firestore.FieldValue.arrayUnion(activitiesCollection),
        })
        .then(() => {
          return userRef.get().then((doc) => {
            const user = doc.data() as UserDTO;
            return {
              id: doc.id,
              ...user,
            };
          });
        });
      const updatedUserDoc = await userRef.get();
      const updatedUser = updatedUserDoc.data() as UserDTO;
      return { id: updatedUserDoc.id, ...updatedUser };
    } catch (error) {
      throw new Error(
        `Erro ao criar estudo para o usuário ${userId}: ${error}`,
      );
    }
  }

  async removeActivities(userId: string, activitiesId: string) {
    try {
      const userRef = this.collection.doc(userId);

      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const user = userDoc.data() as UserDTO;

      const ActivityToRemove = user.activities.find(
        (activities) => activities.id === activitiesId,
      );

      if (!ActivityToRemove) {
        throw new Error('Activity not found');
      }

      await Promise.all([
        userRef.update({
          activities: admin.firestore.FieldValue.arrayRemove(ActivityToRemove),
        }),
        this.activitieService.deleteActivitie(activitiesId),
      ]);

      return { id: userId, activities: ActivityToRemove };
    } catch (error) {
      throw new Error(
        `Erro ao remover atividade do usuário ${userId}: ${error}`,
      );
    }
  }

  async updateActivities(
    userId: string,
    activitiesId: string,
    activities: ActivitiesDTO,
  ) {
    try {
      const userRef = this.collection.doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const user = userDoc.data() as UserDTO;
      const activitiesToUpdate = user.activities.find(
        (activities) => activities.id === activitiesId,
      );

      if (!activitiesToUpdate) {
        throw new Error('Activity not found');
      }

      const activitiesWithId: ActivitiesDTO = {
        id: activitiesId,
        ...activities,
      };

      await Promise.all([
        userRef.update({
          activities:
            admin.firestore.FieldValue.arrayRemove(activitiesToUpdate),
        }),
        userRef.update({
          activities: admin.firestore.FieldValue.arrayUnion(activitiesWithId),
        }),

        this.activitieService.updateActivitie(activitiesId, activities),
      ]);

      const updatedUserDoc = await userRef.get();
      const updatedUser = updatedUserDoc.data() as UserDTO;

      return { id: updatedUserDoc.id, ...updatedUser };
    } catch (error) {
      throw new Error(
        `Erro ao atualizar atividade do usuário ${userId}: ${error}`,
      );
    }
  }

  async getAllActivitiesForUser(userId: string) {
    try {
      const userRef = this.collection.doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const user = userDoc.data() as UserDTO;
      return user.activities;
    } catch (error) {
      throw new Error(
        `Erro ao encontrar atividades para o usuário ${userId}: ${error}`,
      );
    }
  }

  async getActivityById(userId: string, activitiesId: string) {
    try {
      const userRef = this.collection.doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const user = userDoc.data() as UserDTO;
      const activities = user.activities.find(
        (activities) => activities.id === activitiesId,
      );

      if (!activities) {
        throw new Error('Activity not found');
      }

      return activities;
    } catch (error) {
      throw new Error(
        `Erro ao encontrar atividade para o usuário ${userId}: ${error}`,
      );
    }
  }

  async addCategoryToActivity(
    userId: string,
    activitiesId: string,
    categoryId: string,
  ) {
    try {
      const userRef = this.collection.doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const user = userDoc.data() as UserDTO;

      const activitiesToUpdate = user.activities.find(
        (activities) => activities.id === activitiesId,
      );

      if (!activitiesToUpdate) {
        throw new Error('Activity not found');
      }

      await userRef.update({
        activities: admin.firestore.FieldValue.arrayRemove(activitiesToUpdate),
      });

      const categoryRef = firestore().collection('category').doc(categoryId);
      const categoryDoc = (await categoryRef.get()).data();
      if (!categoryDoc) {
        throw new Error('Category not found');
      }

      if (!activitiesToUpdate.category) {
        activitiesToUpdate.category = [];
      }

      activitiesToUpdate.category.push(categoryDoc.category);

      await userRef.update({
        activities: admin.firestore.FieldValue.arrayUnion(activitiesToUpdate),
      });

      const updatedUserDoc = await userRef.get();
      const updatedUser = updatedUserDoc.data() as UserDTO;

      return { id: updatedUserDoc.id, ...updatedUser };
    } catch (error) {
      throw new Error(
        `Erro ao adicionar categoria à atividade do usuário ${userId}: ${error}`,
      );
    }
  }

  async removeCategoryFromActivity(
    userId: string,
    activitiesId: string,
    categoryId: string,
  ) {
    try {
      const userRef = this.collection.doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const user = userDoc.data() as UserDTO;
      const activitiesToUpdate = user.activities.find(
        (activities) => activities.id === activitiesId,
      );

      if (!activitiesToUpdate) {
        throw new Error('Activity not found');
      }

      if (!activitiesToUpdate.category) {
        throw new Error('Category not found in activity');
      }

      await userRef.update({
        activities: admin.firestore.FieldValue.arrayRemove(activitiesToUpdate),
      });

      const categoryRef = firestore().collection('category').doc(categoryId);
      const categoryDoc = await categoryRef.get();

      if (!categoryDoc.exists) {
        throw new Error('Category not found');
      }
      const { category } = categoryDoc.data() as { category: string };

      const categoryIndex = activitiesToUpdate.category.indexOf(category);
      if (categoryIndex === -1) {
        throw new Error('Category not found in activity');
      }

      activitiesToUpdate.category.splice(categoryIndex, 1);

      await userRef.update({
        activities: admin.firestore.FieldValue.arrayUnion(activitiesToUpdate),
      });

      const updatedUserDoc = await userRef.get();
      const updatedUser = updatedUserDoc.data() as UserDTO;

      return { id: updatedUserDoc.id, ...updatedUser };
    } catch (error) {
      throw new Error(
        `Erro ao remover categoria da atividade do usuário ${userId}: ${error}`,
      );
    }
  }

  async listCategoriesForActivity(userId: string, activitiesId: string) {
    try {
      const userRef = this.collection.doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error('Usuário não encontrado');
      }

      const user = userDoc.data() as UserDTO;
      const activities = user.activities.find(
        (activity) => activity.id === activitiesId,
      );

      if (!activities) {
        throw new Error('Atividade não encontrada');
      }

      if (!activities.category || activities.category.length === 0) {
        throw new Error('Não existe categorias para a atividade');
      }
      const categories = await Promise.all(
        activities.category.map(async (categoryId) => {
          const categoryRef = firestore()
            .collection('category')
            .doc(categoryId);
          const categoryDoc = await categoryRef.get();

          if (!categoryDoc.exists) {
            throw new Error(`Category with id ${categoryId} not found`);
          }
          return { id: categoryDoc.id, ...categoryDoc.data() };
        }),
      );

      return categories;
    } catch (error) {
      throw new Error(
        `Erro ao listar categorias da atividade do usuário ${userId}: ${error}`,
      );
    }
  }

  private async uploadFileToStorage(
    file: Express.Multer.File,
  ): Promise<string> {
    const bucket = this.storage.bucket('gac-tcc-27e85.appspot.com');

    const fileName = `${Date.now()}_${file.fieldname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });
    await fileUpload.makePublic();

    return `https://storage.googleapis.com/${this.storage.bucket.name}/${fileName}`;
  }
}
