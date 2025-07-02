import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class ChatDto {
  @IsNotEmpty()
  @IsString()
  userKey: string;

  @IsNotEmpty()
  @IsString()
  sessionId: string = '';

  @IsNotEmpty()
  @IsString()
  query: string = '';

  @IsOptional()
  @IsString()
  context?: string;
}
