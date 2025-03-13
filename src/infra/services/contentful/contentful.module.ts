import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ContentfulService } from "./contentful.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contentful } from "./contentful.entity";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get("contentful.baseURL"),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Contentful]),
  ],
  providers: [ContentfulService],
  exports: [ContentfulService],
})
export class ContentfulModule {}
