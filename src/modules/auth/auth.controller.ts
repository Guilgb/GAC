import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../db/services/firebase.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    try {
      const token = await this.firebaseService.loginWithEmailAndPassword(
        email,
        password,
      );
      return { token };
    } catch (error) {
      throw new UnauthorizedException('Erro ao fazer login: ' + error.message);
    }
  }
}
