import { BlogTag } from '../entities/blog.entity';
import { IsOptional, IsEnum, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindBlogsDto {
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsEnum(BlogTag, { each: true })
  readonly tags?: BlogTag[];

  @IsOptional()
  @IsNumberString()
  readonly page?: string;

  @IsOptional()
  @IsNumberString()
  readonly limit?: string;
}
