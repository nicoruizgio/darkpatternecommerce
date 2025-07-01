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
   */
  async storeMessage(
    sessionId: string,
    query: string,
    response: any, // @todo: find proper type for response
    context?: string,
  ): Promise<void> {
    if (!this.prisma?.ChatMessage) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await this.prisma.ChatMessage.create({
      data: {
        sessionId,
        query,
        response,
        context,
      },
    });
  }

  /**
   * Retrieves messages for a user.
   */
  async getMessages(sessionId: string): Promise<any[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return await this.prisma?.ChatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Handles chat logic with structured output.
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
            params.context
              ? new HumanMessage(params.context)
              : new HumanMessage('Help user to do the shopping'),
          ],
        },
        { configurable: { thread_id: params.sessionId } },
      );

      await this.storeMessage(
        params.sessionId,
        params.query,
        result.messages,
        params.context,
      );

      return result;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to process chat.');
    }
  }
}
