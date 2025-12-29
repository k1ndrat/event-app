import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const existUser = await this.findByEmail(dto.email);
    if (existUser) {
      throw new ConflictException('User with this email already exists');
    }

    const createdUser = await this.userModel.create({
      ...dto,
      password: await hash(dto.password, 10),
    });

    return createdUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).lean();
  }

  async findById(id: string) {
    return await this.userModel.findOne({ _id: id }).lean();
  }
}
