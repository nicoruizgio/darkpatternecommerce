import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { promptTemplates } from '../../../common/prompts/template';
import { StructuredShoppingResponse } from '../../../common/schemas/response.intent';
import { ChatDto } from '../dto/chat.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { MemorySaver } from '@langchain/langgraph';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';

@Injectable()
export class ChatService {
  private agentModel: ChatOpenAI;
  private agentTools: any[] = [];

  constructor(private prisma: PrismaService) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    this.agentModel = new ChatOpenAI({
      temperature: 0.5,
      openAIApiKey: process.env.OPENAI_API_KEY ?? 'test',
    });
  }

  /**
   * Stores a chat message in the database.
   * @param userKey the user key to differentiate the users
   * @param sessionId the session id to store the data
   * @param query the user query
   * @param response reply from the chat
   * @param context Optional user context
   */
  async storeMessage(
    userKey: string,
    sessionId: string,
    query: string,
    response: string,
    context?: string,
  ): Promise<void> {
    if (!this.prisma?.chatMessage) {
      return;
    }

    await this.prisma.chatMessage.create({
      data: {
        userKey,
        sessionId,
        query,
        response,
        context,
      },
    });
  }

  /**
   * Retrieves messages for a user.
   * @param userKey identifying user information
   * @returns the list of messages
   */
  async getMessages(userKey: string): Promise<any[]> {
    return await this.prisma?.chatMessage.findMany({
      where: { userKey },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Handles chat logic with structured output.
   * @param params
   * @returns a response from the chat bot
   */
  async handleChat(params: ChatDto): Promise<any> {
    try {
      const parser = StructuredOutputParser?.fromZodSchema(
        StructuredShoppingResponse,
      );

      const agentCheckpointer = new MemorySaver();
      const agent = createReactAgent({
        llm: this.agentModel,
        tools: this.agentTools,
        checkpointSaver: agentCheckpointer,
      });

      const structuredPrompt = `${promptTemplates.assistant}\n\n${parser.getFormatInstructions()}`;

      const result = await agent.invoke(
        {
          messages: [
            new SystemMessage(structuredPrompt),
            new HumanMessage(params.query),
            new HumanMessage(params.context || ''),
          ],
        },
        { configurable: { thread_id: params.sessionId } },
      );

      const reply = result.messages
        ? result.messages[result.messages?.length - 1]?.text
        : '{}';

      await this.storeMessage(
        params.userKey,
        params.sessionId,
        params.query,
        reply,
        params.context,
      );

      return reply;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to process chat.');
    }
  }
}
