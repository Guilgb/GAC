import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';

@Injectable()
export class ComplementaryCategoryService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
  ) {
    this.collection = firestore().collection('category');
  }

  async createCategory(category: string) {
    try {
      const existingCategory = await this.collection
        .where('category', '==', category)
        .get();

      if (!existingCategory.empty) {
        throw new ConflictException('Categoria já existe');
      }

      const categoryRef = {
        category,
      };
      return this.collection.add(categoryRef).then((doc) => {
        return { id: doc.id, ...categoryRef };
      });
    } catch (error) {
      throw new Error(error).message;
    }
  }

  async getComplementaryCategoryService() {
    try {
      return (await this.collection.get()).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error(error).message;
    }
  }

  async getComplementaryCategoryByIdService(id: string) {
    try {
      const category = await this.collection.doc(id).get();
      if (!category.exists) {
        throw new ConflictException('Categoria não encontrada');
      }
      return { id: category.id, ...category.data() };
    } catch (error) {
      throw new Error(error).message;
    }
  }

  async updateComplementaryCategoryService(id: string, category: string) {
    try {
      const categoryRef = {
        category,
      };
      return this.collection
        .doc(id)
        .update(categoryRef)
        .then(() => {
          return { id, ...categoryRef };
        });
    } catch (error) {
      throw new Error(error).message;
    }
  }

  async deleteComplementaryCategoryService(id: string) {
    try {
      return this.collection.doc(id).delete();
    } catch (error) {
      throw new Error(error).message;
    }
  }
}
