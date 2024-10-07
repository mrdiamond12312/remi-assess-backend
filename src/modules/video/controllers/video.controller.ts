import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ROLE } from '@/constants';
import { Auth } from '@/decorators';
import { NewVideoDto } from '@/modules/video/domains/dtos/request/new-video.dto';
import { VideosListPaginationDto } from '@/modules/video/domains/dtos/request/video-list-pagination.dto';
import { VideoRecordDto } from '@/modules/video/domains/dtos/response/video-record.dto';
import { VideoService } from '@/modules/video/services/video.service';

@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Auth([ROLE.USER])
  @Post('/share')
  async shareVideo(@Body() video: NewVideoDto): Promise<VideoRecordDto> {
    return this.videoService.shareVideo(video);
  }

  @Get('')
  async videosList(@Query() videosListPaginationDto: VideosListPaginationDto) {
    return this.videoService.getVideosList(videosListPaginationDto);
  }
}
