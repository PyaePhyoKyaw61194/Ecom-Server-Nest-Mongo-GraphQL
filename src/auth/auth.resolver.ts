import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/currentUser.decorator';
import { LoginUserInput } from './input/loginUser.input';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserModel } from './model/loginUser.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginUserModel)
  // @UseGuards(JwtAuthGuard)
  async login(@Args('input') input: LoginUserInput) {
    return await this.authService.login(input);
  }

  @Mutation(() => Boolean)
  async validateToken(@Args('input') token: string) {
    return await this.authService.validateToken(token);
  }

  @Query(() => LoginUserModel)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: LoginUserModel) {
    return { user };
  }
}
