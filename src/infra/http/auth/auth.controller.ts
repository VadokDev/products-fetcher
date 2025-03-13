import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() credentials: { user: string; password: string }) {
    return this.authService.login(credentials.user, credentials.password);
  }
}
