import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The id of the article',
    example: 1,
    minimum: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The name of the article',
    example: 'Notebook',
  })
  name: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  @ApiProperty({
    description: 'The date the article was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({
    description: 'The date the article was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  updated: Date;
}
