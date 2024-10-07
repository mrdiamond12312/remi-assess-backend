import { forwardRef, Module } from '@nestjs/common';

import { UserController } from '@/modules/user/controllers/user.controller';
import { UserRepository } from '@/modules/user/repositories/user.repository';
import { UserService } from '@/modules/user/services/user.service';
import { VideoModule } from '@/modules/video/video.module';

@Module({
  imports: [forwardRef(() => VideoModule)],
  exports: [UserService],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
