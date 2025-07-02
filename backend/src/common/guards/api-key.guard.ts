import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const headers: IncomingHttpHeaders = request.headers;
    const apiKey: string | string[] = headers['x-api-key'] ?? '';
    if (!apiKey) {
      Logger.error('API key missing');
      return false;
    }

    const validKey = this.configService.get('CHAT_API_KEY');
    if (apiKey !== validKey) {
      Logger.error('Invalid API Key');
      return false;
    }
    return true;
  }
}
