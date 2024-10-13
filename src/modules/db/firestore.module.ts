import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig } from './firebase.config';
import { FirestoreService } from './services/firestore.service';
import { ActivitieService } from '../activities/activities.service';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        if (admin.apps.length === 0) {
          admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          });
        }
        return admin;
      },
    },
    {
      provide: 'ActivitieService',
      useClass: ActivitieService,
    },
    FirestoreService,
  ],
  controllers: [],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
