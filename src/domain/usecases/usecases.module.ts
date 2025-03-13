import { Module } from "@nestjs/common";
import { SyncProductsUseCase } from "./products/sync-products.usecase";
import { Product } from "src/domain/entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentfulModule } from "src/infra/services/contentful/contentful.module";

const useCases = [SyncProductsUseCase];

@Module({
  imports: [ContentfulModule, TypeOrmModule.forFeature([Product])],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
