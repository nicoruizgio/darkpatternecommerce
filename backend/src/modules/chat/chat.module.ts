import { Module } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ChatService, PrismaService],
  exports: [ChatService],
})
export class ChatModule {}
