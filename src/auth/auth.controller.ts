import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn() {
    return 'Initiating sign-in process';
  }

  @Post('signup')
  signUp() {
    return 'Initiating sign-up process';
  }
}
