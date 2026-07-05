import { UserService } from './../user/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.gurad';

@Controller('auth') // /auth/register
export class AuthController {
  // authService: AuthService;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    // this.authService = authService;
  }

  @Post('/register')
  async register(@Body() registerUserDto: RegisterDto) {
    // Logic for user registration
    const token = await this.authService.registerUser(registerUserDto);
    return token;

    // return { message: 'User registered successfully!' };
  }

  @Post('/login')
  async login(@Body() registerUserDto: RegisterDto) {
    // Todo: Logic for user login
    /**
     * 1. Receive email and password
     * 2. Match email & password
     * 3. Generate JWT token
     */
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;

    const user = await this.userService.getUserById(userId);
    console.log('user', user);

    return {
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    };
  }
}
