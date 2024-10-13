import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './modules/db/firestore.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ComplementaryActivitiesModule } from './modules/category/category.module';
import { ActivitiesModule } from './modules/activities/activities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirebaseModule,
    UserModule,
    AuthModule,
    ComplementaryActivitiesModule,
    ActivitiesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
