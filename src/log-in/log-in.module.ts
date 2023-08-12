import { Module } from '@nestjs/common';
import { LogInService } from './log-in.service';

@Module({
  providers: [LogInService]
})
export class LogInModule {}
