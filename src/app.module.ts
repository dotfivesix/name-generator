import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUpService } from './sign-up/sign-up.service';
import { SignUpModule } from './sign-up/sign-up.module';
import { LogInController } from './log-in/log-in.controller';
import { LogInModule } from './log-in/log-in.module';
import { LogInService } from './log-in/log-in.service';
import { ForgotPasswordController } from './forgot-password/forgot-password.controller';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { NameService } from './name/name.service';
import { NameModule } from './name/name.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesModule } from './favorites/favorites.module';
import { PasswordEncryptor } from './utils/PasswordEncryptor';
import { IdGenerator } from './utils/IdGenerator';
import { Validator } from './utils/Validator';
import { EmailSystem } from './utils/EmailSystem';

@Module({
  imports: [SignUpModule, LogInModule, ForgotPasswordModule, NameModule, UserModule, FavoritesModule],
  controllers: [AppController, LogInController, ForgotPasswordController, UserController, FavoritesController],
  providers: [AppService, SignUpService, LogInService, NameService, PasswordEncryptor, IdGenerator, Validator, EmailSystem],
})
export class AppModule {}
