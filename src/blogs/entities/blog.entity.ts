import { IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

export enum BlogTag {
  TECH = 'tech',
  LIFESTYLE = 'lifestyle',
  EDUCATION = 'education',
  POLITICS = 'politics',
  HEALTH = 'health',
}

@Entity('blogs')
export class Blog extends BaseEntity {
  @Column()
  @IsString()
  title: string;

  @Column('text')
  @IsString()
  content: string;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  authorId: string;

  @Column({
    type: 'text',
    array: true,
  })
  tags: BlogTag[];

}
