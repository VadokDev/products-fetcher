import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { credentials } from "./auth.constants";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: string, password: string) {
    if (user !== credentials.user || password !== credentials.password) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({ sub: "apply", user });

    return { accessToken };
  }
}
