import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(email);

    if (updateUserDto.role && user.role !== 'admin') {
      throw new ForbiddenException('Only admin can change roles');
    }

    const updated = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updated);
  }

  async softDelete(email: string): Promise<void> {
    const user = await this.findOne(email);
    user.isDeleted = true;
    await this.userRepository.save(user);
  }
}
