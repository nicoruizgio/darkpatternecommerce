import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common';
import { ChatService } from './modules/chat/service/chat.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyGuard } from './common/guards/api-key.guard';

@ApiTags('Chat')
@Controller('')
@UseGuards(ApiKeyGuard)
export class AppController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/')
  @ApiOperation({ summary: 'Health check' })
  healthCheck(): number {
    return 200;
  }

  @Post('chat/:userKey')
  @ApiSecurity('x-api-key')
  @ApiOperation({ summary: 'Invoke shopping assistant' })
  @ApiParam({ name: 'userKey', description: 'Session ID' })
  @ApiBody({
    schema: {
      example: {
        query: 'What can I buy today?',
        userId: '1234',
        context: 'I am looking for a new headphone.',
      },
    },
  })
  async chat(
    @Param('userKey') userKey: string,
    @Body() body: { query: string; userId: string },
  ): Promise<any> {
    return await this.chatService.handleChat({
      userKey: userKey,
      sessionId: body.userId,
      query: body.query,
    });
  }
}
