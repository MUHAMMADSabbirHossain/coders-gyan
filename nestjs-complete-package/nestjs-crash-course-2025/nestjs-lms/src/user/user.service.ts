import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error: unknown) {
      console.log(error);

      const e = error as { code?: number };
      const DUPLICATE_KEY_CODE = 11000;

      if (e.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('Email already exists.');
      }

      throw error;
    }

    // return { message: 'User created!' };
  }

  async getUserById(id: string) {
    return await this.userModel.findById({ _id: id });
  }
}
