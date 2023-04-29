import { ApiProperty } from '@nestjs/swagger';

export class ErrorUnauthorizedDto {
  @ApiProperty({
    description: 'The HTTP status code',
    minimum: 100,
    default: 401,
    example: 401,
  })
  statusCode: number;
  @ApiProperty({
    description: 'The error message',
    default: 'Unauthorized',
    example: 'Unauthorized',
  })
  message: string;
}
