import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger('PostsService');

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = this.postRepository.create(createPostDto);

      await this.postRepository.save(post);

      return post;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const posts = await this.postRepository.find({
        take: limit,
        skip: offset,
      });

      return posts;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) throw new NotFoundException(`Post with id: ${id} not found`);

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      await this.dataSource
        .createQueryBuilder()
        .update(Post)
        .set(updatePostDto)
        .where('id = :id', { id })
        .execute();

      return this.findOne(id);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const post = await this.findOne(id);

    this.postRepository.remove(post);

    return post;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
