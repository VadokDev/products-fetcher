import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { secret } from "./auth.constants";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "60m" },
      secret,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
