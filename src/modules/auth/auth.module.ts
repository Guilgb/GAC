import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/authService';
import { FirebaseService } from '../db/services/firebase.service';

@Module({
  imports: [ConfigModule],
  providers: [AuthService, FirebaseService, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
