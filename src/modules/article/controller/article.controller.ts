import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Article } from '../entity/article.entity';
import { ErrorUnauthorizedDto } from '../../../exception/error.unauthorized.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { ArticleRequestDto } from '../dto/article-request.dto';
import { ErrorNotFoundDto } from '../../../exception/error-not-found.dto';

@Controller('article')
@ApiTags('Article Methods')
@ApiBearerAuth()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The record has been found.',
    type: Article,
  })
  @ApiUnauthorizedResponse({
    description: 'Not logged in!',
    type: ErrorUnauthorizedDto,
  })
  getArticles(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been created.',
    type: Article,
  })
  @ApiUnauthorizedResponse({
    description: 'Not logged in!',
    type: ErrorUnauthorizedDto,
  })
  createArticle(@Body() article: ArticleRequestDto): Promise<Article> {
    return this.articleService.create(article);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The record has been found.',
    type: Article,
  })
  @ApiUnauthorizedResponse({
    description: 'Not logged in!',
    type: ErrorUnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'The record has not been found.',
    type: ErrorNotFoundDto,
  })
  getArticleById(@Param('id') id: number): Promise<Article> {
    return this.articleService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The record has been replaced.',
    type: Article,
  })
  @ApiUnauthorizedResponse({
    description: 'Not logged in!',
    type: ErrorUnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'The record has not been found.',
  })
  replaceArticleById(
    @Param('id') id: number,
    @Body() article: Article,
  ): Promise<Article | null> {
    return this.articleService.replace(id, article);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The record has been updated.',
    type: Article,
  })
  @ApiUnauthorizedResponse({
    description: 'Not logged in!',
    type: ErrorUnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'The record has not been found.',
  })
  updateArticleById(
    @Param('id') id: number,
    @Body() article: Article,
  ): Promise<Article | null> {
    return this.articleService.update(id, article);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The record has been deleted.',
    type: Article,
  })
  @ApiUnauthorizedResponse({
    description: 'Not logged in!',
    type: ErrorUnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'The record has not been found.',
  })
  deleteArticleById(@Param('id') id: number) {
    return this.articleService.deleteArticleById(id);
  }
}
