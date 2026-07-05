import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterDto) {
    console.log('registerDto', registerUserDto);

    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    // Logic for user registration
    /**
     * 1. Check if email already exists
     * 2. Hash password
     * 3. Store the user into db
     * 4. generate JWT token
     * 5. send token in the response
     */

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    // console.log('user', user);

    // Todo: Remove role admin from here. Only for testing.
    const payload = {
      sub: user._id,
      role: 'admin',
    };
    const token = this.jwtService.signAsync(payload);
    console.log('token', token);

    return { access_token: token };

    // return {
    //   message: 'User registered successfully',
    // };
  }
}
