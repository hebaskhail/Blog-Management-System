import { IsArray, IsNotEmpty, IsEnum } from 'class-validator';
import { BlogTag } from '../entities/blog.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateBlogDto {
  @ApiProperty({ example: 'First Blog' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: 'This is the content of the blog...' })
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ example: ['health', 'education'], isArray: true })
  @IsArray()
  @IsEnum(BlogTag, { each: true, message: 'Invalid tag: $value' })
  @Transform(({ value }) => value.map((tag) => tag.toLowerCase())) // Ensure all tags are lowercase
  tags: BlogTag[];
}
