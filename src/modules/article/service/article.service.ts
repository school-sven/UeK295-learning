import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { ArticleRequestDto } from '../dto/article-request.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async create(article: ArticleRequestDto): Promise<Article> {
    return this.articleRepository.save(article);
  }

  async findById(id: number): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }

  async replace(id: number, article: Article): Promise<Article | null> {
    await this.articleRepository.update({ id }, article);
    return this.findById(id);
  }

  async update(id: number, article: Article): Promise<Article | null> {
    await this.articleRepository.update({ id }, article);
    return this.findById(id);
  }

  async deleteArticleById(id: number) {
    return this.articleRepository.delete({ id });
  }
}
