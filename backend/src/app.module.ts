import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './modules/chat/chat.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AppController } from './app.controller';
import { ChatService } from './modules/chat/service/chat.service';

@Module({
  imports: [
    ConfigModule?.forRoot({ isGlobal: true }),
    ChatModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [ChatService],
})
export class AppModule {}
