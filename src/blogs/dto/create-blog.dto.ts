import { IsArray, IsNotEmpty, IsEnum } from 'class-validator';
import { BlogTag } from '../entities/blog.entity';

export class CreateBlogDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  @IsArray()
  @IsEnum(BlogTag, { each: true })
  tags: BlogTag[];
}
