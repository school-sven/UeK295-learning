import { ApiProperty } from '@nestjs/swagger';

export class ErrorNotFoundDto {
  @ApiProperty({
    description: 'The HTTP status code',
    minimum: 100,
    maximum: 600,
    default: 404,
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    description: 'The error message',
    example: 'Not Found',
  })
  message: string;
  @ApiProperty({
    description: 'The error description',
    example: 'Article with id 1000 not found',
  })
  error: string;
}
