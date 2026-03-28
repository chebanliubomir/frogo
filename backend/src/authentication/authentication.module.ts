import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { TokensModule } from '@/tokens/tokens.module';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [
    UserModule,
    TokensModule
  ],
})
export class AuthenticationModule { }
