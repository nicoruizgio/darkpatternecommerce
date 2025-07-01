import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
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
      console.log('Headers: ', headers);
      throw new Error('API key missing');
    }
    const validKey = this.configService.get('CHAT_API_KEY');
    if (apiKey !== validKey) {
      throw new UnauthorizedException('Invalid API Key');
    }
    return true;
  }
}
