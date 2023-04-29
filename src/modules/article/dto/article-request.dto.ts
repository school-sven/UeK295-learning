import { ApiProperty } from '@nestjs/swagger';

export class ArticleRequestDto {
  @ApiProperty({
    description: 'The name of the article',
    example: 'Notebook',
  })
  name: string;
}
