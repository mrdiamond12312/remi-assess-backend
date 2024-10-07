import { VideoEntity } from '@/modules/video/domains/entities/video.entity';

export class VideosListResponseDto {
  entities: VideoEntity[];

  itemCount: number;

  constructor(entities: VideoEntity[], itemCount: number) {
    this.entities = entities;
    this.itemCount = itemCount;
  }
}
