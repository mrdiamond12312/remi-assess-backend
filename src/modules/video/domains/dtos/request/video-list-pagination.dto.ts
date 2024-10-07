import { NumberFieldOptional } from '@/decorators';

export class VideosListPaginationDto {
  @NumberFieldOptional({
    minimum: 1,
    default: 1,
    int: true,
  })
  readonly page: number = 1;

  @NumberFieldOptional({
    minimum: 1,
    maximum: 50,
    default: 12,
    int: true,
  })
  readonly take: number = 12;

  @NumberFieldOptional({
    minimum: 0,
    maximum: 50,
    default: 0,
    int: true,
  })
  readonly offset?: number;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
