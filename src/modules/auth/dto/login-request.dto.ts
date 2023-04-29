import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john.doe',
  })
  username: string;
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;
}
