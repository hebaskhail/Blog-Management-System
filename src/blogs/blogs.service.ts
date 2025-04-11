import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { FindBlogsDto } from './dto/find-blogs.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
  ) {}
  async create(createBlogDto: CreateBlogDto, authorId: string) {
    const blog = this.blogRepository.create({
      ...createBlogDto,
      author: { id: authorId },
    });

    return this.blogRepository.save(blog);
  }

  async findAll(req: Request, findBlogsDto: FindBlogsDto) {
    const { tags } = findBlogsDto;
    const { page, limit, offset } = (req as any).pagination;

    const query = this.blogRepository.createQueryBuilder('blog');

    if (tags && tags.length > 0) {
      query.andWhere('blog.tags && :tags', { tags });
    }

    query.orderBy('blog.createdAt', 'DESC');

    query.skip(offset);
    query.take(limit);

    const [blogs, total] = await query.getManyAndCount();

    return {
      data: blogs,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, user) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (user.role === 'editor' && blog.authorId !== user.id) {
      throw new ForbiddenException('You can only update your own blogs');
    }

    blog.title = updateBlogDto.title || blog.title;
    blog.content = updateBlogDto.content || blog.content;
    blog.tags = updateBlogDto.tags || blog.tags;

    await this.blogRepository.save(blog);

    return blog;
  }

  async delete(id: string) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    await this.blogRepository.remove(blog);
    return { message: 'Blog deleted successfully' };
  }
}
