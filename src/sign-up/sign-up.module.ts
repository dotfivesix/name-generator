import { Module } from '@nestjs/common';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { PasswordEncryptor } from 'src/utils/PasswordEncryptor';
import { IdGenerator } from 'src/utils/IdGenerator';
import { Validator } from 'src/utils/Validator';
import { EmailSystem } from 'src/utils/EmailSystem';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService, PasswordEncryptor, IdGenerator, Validator, EmailSystem]
})
export class SignUpModule {}
