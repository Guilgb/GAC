import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { firestore } from 'firebase-admin';
import { ComplementaryActivitiesDTO } from 'src/modules/category/use-cases/dto/category.dto';

@Injectable()
export class FirestoreUserService {
  private collenction: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor(@Inject(REQUEST) private readonly request: { user: any }) {
    this.collenction = firestore().collection('complementaryActivities');
  }

  async createComplementaryActivities(
    complementaryActivities: ComplementaryActivitiesDTO,
  ) {
    const complementaryActivitiesC = {
      ...complementaryActivities,
    };
    const complementary: Omit<ComplementaryActivitiesDTO, 'id'> = {
      ...complementaryActivitiesC,
    };
    return this.collenction.add(complementary).then((doc) => {
      return { id: doc.id, ...complementary };
    });
  }
}
