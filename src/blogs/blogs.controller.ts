import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseInterceptors,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ExtendedRequest } from 'src/types/express';
import { PaginationInterceptor } from '../common/interceptors/pagination.interceptor';
import { FindBlogsDto } from './dto/find-blogs.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @UseInterceptors(PaginationInterceptor)
  findAll(@Req() req: Request, @Query() findBlogDto: FindBlogsDto) {
    return this.blogsService.findAll(req, findBlogDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Post()
  @Roles('admin', 'editor')
  @UseGuards(RolesGuard)
  create(@Body() createBlogDto: CreateBlogDto, @Req() req: ExtendedRequest) {
    const id = req.user.sub;

    return this.blogsService.create(createBlogDto, id);
  }

  @Put(':id')
  @Roles('admin', 'editor') // Admin and Editor can update
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Req() req: ExtendedRequest,
  ) {
    return this.blogsService.update(id, updateBlogDto, req.user.sub);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  delete(@Param('id') id: string) {
    return this.blogsService.delete(id);
  }
}
