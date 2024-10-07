import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '@/modules/user/user.module';
import { VideoController } from '@/modules/video/controllers/video.controller';
import { VideoRepository } from '@/modules/video/repositories/video.repository';
import { VideoService } from '@/modules/video/services/video.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  exports: [VideoService],
  providers: [VideoService, VideoRepository],
  controllers: [VideoController],
})
export class VideoModule {}
