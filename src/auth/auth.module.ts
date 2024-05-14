import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './serializer/session.serializer';
import { MailModule } from '../mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './consumer/email.consumer';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailModule,
    BullModule.registerQueue({
      name: 'send-mail',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    ConfigService,
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    SessionSerializer,
    EmailConsumer,
  ],
})
export class AuthModule {}
