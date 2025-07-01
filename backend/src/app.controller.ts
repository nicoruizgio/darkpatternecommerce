import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ChatService } from './modules/chat/service/chat.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyGuard } from './common/guards/api-key.guard';

@ApiTags('Chat')
@Controller() // @Controller('chat')
@UseGuards(ApiKeyGuard)
export class AppController {
  constructor(private readonly chatService: ChatService) {}

  @Post('chat/:sessionId')
  @ApiSecurity('x-api-key')
  @ApiOperation({ summary: 'Invoke shopping assistant' })
  @ApiParam({ name: 'sessionId', description: 'Session ID' })
  @ApiBody({
    schema: { example: { query: 'Hello', context: 'optional' } },
  })
  async chat(
    @Param('sessionId') sessionId: string,
    @Body() body: { query: string; context?: string },
  ): Promise<any> {
    Logger.log('Handle Chat:');
    return this.chatService.handleChat({
      sessionId: sessionId,
      query: body.query,
      context: body.context,
    });
  }
}
