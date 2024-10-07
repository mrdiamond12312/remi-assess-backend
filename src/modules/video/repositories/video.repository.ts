import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { VideosListPaginationDto } from '@/modules/video/domains/dtos/request/video-list-pagination.dto';
import { VideosListResponseDto } from '@/modules/video/domains/dtos/response/video-list.dto';
import { VideoEntity } from '@/modules/video/domains/entities/video.entity';

@Injectable()
export class VideoRepository extends Repository<VideoEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(VideoEntity, dataSource.createEntityManager());
  }

  async getVideosList(
    paginationObject: VideosListPaginationDto,
  ): Promise<VideosListResponseDto> {
    const queryBuilder = this.createQueryBuilder('videos').leftJoinAndSelect(
      'videos.user',
      'user',
    );

    // Handle paging
    const skip =
      (paginationObject.page - 1) * paginationObject.take +
      paginationObject.offset;
    queryBuilder.skip(skip).take(paginationObject.take);

    // Retrieve entities
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    console.log(entities);
    return new VideosListResponseDto(entities, itemCount);
  }
}
