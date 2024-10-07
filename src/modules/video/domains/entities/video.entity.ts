import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/common/abstract.entity';
import { UserEntity } from '@/modules/user/domains/entities/user.entity';

@Entity('videos')
export class VideoEntity extends AbstractEntity {
  @Column()
  youtubeUrl: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @ManyToOne(() => UserEntity, (user) => user.videos)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
