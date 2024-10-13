import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  initializeApp as initializeAdminApp,
  applicationDefault,
  getApps,
  App,
} from 'firebase-admin/app';
import { getAuth as getAdminAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';
import { initializeApp as initializeClientApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  Auth as ClientAuth,
} from 'firebase/auth';

@Injectable()
export class FirebaseService {
  public readonly app: App;
  public readonly auth: Auth;
  public readonly firestore: Firestore;
  public readonly storage: Storage;
  public readonly clientAuth: ClientAuth;
  public adminAuth: Auth;

  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    if (getApps().length === 0) {
      if (this.config.get('APP_ENV') !== 'development') {
        initializeAdminApp({
          credential: applicationDefault(),
          databaseURL: process.env.DATABASE_URL,
          projectId: this.config.get('GOOGLE_CLOUD_PROJECT'),
          storageBucket: this.config.get('GOOGLE_CLOUD_STORAGE_BUCKET'),
        });
      }
    }
    this.app = getApps()[0];
    this.adminAuth = getAdminAuth();

    // Configurar o Firebase Client SDK
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };

    const clientApp = initializeClientApp(firebaseConfig);

    this.auth = getAdminAuth(this.app);
    this.firestore = getFirestore(this.app);
    this.storage = getStorage(this.app);
    this.clientAuth = getAuth(clientApp);
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<string> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.clientAuth,
        email,
        password,
      );
      const user = userCredential.user;

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const idToken = await user.getIdToken();
      return idToken;
    } catch (error) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  }
}
