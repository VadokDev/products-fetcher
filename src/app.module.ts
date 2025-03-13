import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import contentfulConfig from "./infra/services/contentful/contentful.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import dbConfig from "./infra/db/db.config";
import { UseCasesModule } from "./domain/usecases/usecases.module";
import { ProductsModule } from "./infra/http/products/products.module";
import { AuthModule } from "./infra/http/auth/auth.module";
import { ReportsModule } from "./infra/http/reports/reports.module";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [contentfulConfig], isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig()),
    ScheduleModule.forRoot(),
    UseCasesModule,
    ProductsModule,
    ReportsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
