import { ConfigService } from '@nestjs/config';
import { App } from 'firebase-admin/app';
import { Auth } from 'firebase-admin/auth';
import { Firestore } from 'firebase-admin/firestore';
import { Storage } from 'firebase-admin/storage';
export declare class FirebaseService {
    private readonly config;
    readonly app: App;
    readonly auth: Auth;
    readonly firestore: Firestore;
    readonly storage: Storage;
    constructor(config: ConfigService);
}
