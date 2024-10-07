import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NewVideoDto {
  @ApiProperty()
  @IsString()
  youtubeUrl: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  thumbnail: string;
}
