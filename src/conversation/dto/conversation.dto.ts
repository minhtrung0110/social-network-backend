import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateConversationDTO {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  icon: string;
  @IsOptional()
  theme: string;
  @IsOptional()
  status: number;
}

export class UpdateConversationDTO {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  icon: string;
  @IsOptional()
  theme: string;
  @IsOptional()
  status: number;
}
