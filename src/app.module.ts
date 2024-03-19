import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { LikeModule } from './like/like.module';
import { SavedModule } from './saved/saved.module';
import { FollowModule } from './follow/follow.module';
import { UserConversationModule } from './userconversation/userconversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    MessageModule,
    ConversationModule,
    LikeModule,
    SavedModule,
    FollowModule,
    UserConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
