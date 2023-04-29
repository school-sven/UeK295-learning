import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The id of the user',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;

  @Column()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @Column()
  @ApiProperty({
    description: 'The username of the user',
    example: 'john.doe',
  })
  username: string;

  @Column()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;

  @Column({ default: true })
  @ApiProperty({
    description: 'The status of the user',
    example: true,
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  @ApiProperty({
    description: 'The date the user was created',
    example: '2020-01-01T00:00:00.000Z',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({
    description: 'The date the user was updated',
    example: '2020-01-01T00:00:00.000Z',
  })
  updated: Date;

  @VersionColumn({ default: 1 })
  @ApiProperty({
    description: 'The version of the user',
    example: 1,
    default: 1,
  })
  version: number;
}
