import { Column, Entity, OneToMany } from 'typeorm';
import { IsEnum } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Blog } from '../../blogs/entities/blog.entity';

export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
}

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.EDITOR })
  @IsEnum(Role)
  role: Role;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];

  @Column({ default: false })
  isDeleted: boolean;
}
