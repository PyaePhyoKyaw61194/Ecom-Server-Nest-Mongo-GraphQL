import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compareHash } from 'src/utils/hash';
import { LoginUserInput } from './input/loginUser.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserInput: LoginUserInput) {
    const user = await this.userService.findByEmail(loginUserInput);

    const isCorrectPwd = await compareHash(
      loginUserInput.password,
      user.password,
    );

    if (user && isCorrectPwd) return user;

    throw new UnauthorizedException('Invalid Credentials');
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.validateUser(loginUserInput);

    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        name: user.profile?.name,
      }),
      user,
    };
  }

  async validateToken(token: string) {
    try {
      await this.jwtService.verify(token);

      return true;
    } catch (e) {
      return false;
    }
  }
}
