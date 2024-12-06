import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // const authorization = request.headers['authorization'];
    const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNDJmMzU3NC1kNmUyLTQzNGQtYWI1My1kY2IzOWMzYzhjMWEiLCJ1c2VybmFtZSI6Imx1Y2Fza2UiLCJpYXQiOjE3MzM1MDU0NjJ9.MO_ZA1kD8dXoTk6bqvmQ473qfY5Zxhan73hBf391V18";

    console.log('authorization ', authorization);

    if (!authorization) {
      return;
    }

    const [, token] = authorization.split(' ');

    return this.authService.verifyToken(token);
  }
}
