import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { PageMetaDto } from '@/common/dtos/page-meta.dto';
import { PageDto } from '@/common/dtos/page.dto';
// import { ROLE } from '@/constants';
// import { GoogleSignInDto } from '@/modules/auth/domains/dtos/google-sign-in.dto';
import { UserService } from '@/modules/user/services/user.service';
import { NewVideoDto } from '@/modules/video/domains/dtos/request/new-video.dto';
import { VideosListPaginationDto } from '@/modules/video/domains/dtos/request/video-list-pagination.dto';
import { VideosListResponseDto } from '@/modules/video/domains/dtos/response/video-list.dto';
import { VideoRecordDto } from '@/modules/video/domains/dtos/response/video-record.dto';
import { VideoEntity } from '@/modules/video/domains/entities/video.entity';
import { VideoRepository } from '@/modules/video/repositories/video.repository';
import { ContextProvider } from '@/providers';

@Injectable()
export class VideoService {
  constructor(
    private readonly userService: UserService,
    private readonly videoRepository: VideoRepository,
  ) {}

  async shareVideo(newVideoObject: NewVideoDto) {
    return await this.videoRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const newVideo = new VideoEntity();
        newVideo.description = newVideoObject.description;
        newVideo.youtubeUrl = newVideoObject.youtubeUrl;
        newVideo.thumbnail = newVideoObject.thumbnail;
        newVideo.title = newVideoObject.title;

        const sharer = await this.userService.findOneById(
          ContextProvider.getAuthUser().id,
        );

        newVideo.user = sharer;

        const video = await entityManager.save(newVideo);

        return new VideoRecordDto(
          video.youtubeUrl,
          video.title,
          video.description,
          video.thumbnail,
          video.user,
        );
      },
    );
  }

  async getVideosList(
    paginationObject: VideosListPaginationDto,
  ): Promise<PageDto<VideoEntity>> {
    const videosListResponse: VideosListResponseDto =
      await this.videoRepository.getVideosList(paginationObject);

    const pageMeta = new PageMetaDto({
      pageOptionsDto: paginationObject,
      itemCount: videosListResponse.itemCount,
    });

    return new PageDto(videosListResponse.entities, pageMeta);
  }
}
