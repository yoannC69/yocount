import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/users.schema';
import { CreateUsersDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async createUser(createUsersDto: CreateUsersDto): Promise<Users> {
    const createdUsers = new this.usersModel(createUsersDto);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createdUsers.password, salt);
    createdUsers.password = hash;
    return createdUsers.save();
  }

  async getUsersById(id: string): Promise<Users> {
    return this.usersModel.findById(id)
  }

  async updateUser(id: string, createUsersDto: CreateUsersDto): Promise<Users> {
    return this.usersModel.findByIdAndUpdate(id, createUsersDto)
  }
  async deleteUser(id: string): Promise<Users> {
    return this.usersModel.findByIdAndDelete(id)
  }

  async findOne(username: string): Promise<User> {
    console.log(username)
    return this.usersModel.findOne({ username: username })
  }
}