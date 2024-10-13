import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authorization.split('Bearer ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token: ' + error.message);
    }
  }
}
