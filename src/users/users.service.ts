
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private repo: Repository<Users>,
  ) {}
  async findAll(): Promise<Users[]> {
    return this.repo.find();
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.repo.findOne({ where: { username } });
  }
  async findOneById(id: number): Promise<Users | undefined> {
    const user = await this.repo.findOneBy({ id });
    return user ?? undefined;
  }
  async create(username: string, passwordHash: string): Promise<Users> {
    const user = this.repo.create({
      username,
      password: passwordHash,
    });
    return this.repo.save(user);
  }
  async update(id: number, updateUserDto: any): Promise<void> {
    await this.repo.update(id, updateUserDto);
  }
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
