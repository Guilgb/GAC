// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/modules/db/services/firebase.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async validateToken(token: string): Promise<any> {
    try {
      return await this.firebaseService.auth.verifyIdToken(token);
    } catch (error) {
      throw new Error('Invalid token').message;
    }
  }
}
