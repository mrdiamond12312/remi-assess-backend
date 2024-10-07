import { UserEntity } from '@/modules/user/domains/entities/user.entity';

export class VideoRecordDto {
  youtubeUrl: string;

  title: string;

  description: string;

  thumbnail: string;

  userFullname: string;

  constructor(
    youtubeUrl: string,
    title: string,
    description: string,
    thumbnail: string,
    user: UserEntity,
  ) {
    this.youtubeUrl = youtubeUrl;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.userFullname = user.fullName ?? user.userName;
  }
}
