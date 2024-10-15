import { Inject, Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { ActivitieDTO } from './use-cases/dto/activities.dto';

@Injectable()
export class ActivitieService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
  ) {
    this.collection = firestore().collection('activities');
  }

  async createActivitie(activitie: ActivitieDTO) {
    try {
      const activitieRef = {
        ...activitie,
        startDate: new Date(activitie.startDate),
      };

      return this.collection.add(activitieRef).then((doc) => {
        return { id: doc.id, ...activitieRef };
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateActivitie(id: string, activitie: ActivitieDTO) {
    try {
      const activitieRef = {
        ...activitie,
        startDate: new Date(activitie.startDate),
      };

      return this.collection
        .doc(id)
        .update(activitieRef)
        .then(() => {
          return { id, ...activitieRef };
        });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getActivitie(id: string) {
    try {
      const activitie = await this.collection.doc(id).get();

      if (!activitie.exists) {
        throw new Error('Atividade não encontrada');
      }

      return { id: activitie.id, ...activitie.data() };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteActivitie(id: string) {
    try {
      return this.collection.doc(id).delete();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getAllActivities() {
    try {
      return (await this.collection.get()).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
