import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../../entities/product.entity";
import { fromContentfulItemToProduct } from "../../mappers/product.mapper";
import { ContentfulService } from "../../..//infra/services/contentful/contentful.service";
import { Repository } from "typeorm";

@Injectable()
export class SyncProductsUseCase {
  private readonly logger = new Logger(SyncProductsUseCase.name);

  constructor(
    private readonly contentfulService: ContentfulService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async execute() {
    this.logger.log("Syncing products");
    const oldSyncToken = await this.contentfulService.getSyncToken();
    const remainingTokens = [oldSyncToken];

    while (remainingTokens.length) {
      const syncToken = remainingTokens.pop();
      const { data } = await this.contentfulService.fetch(syncToken);
      const { nextPageUrl, nextSyncUrl } = data;
      const nextUrl = nextPageUrl || nextSyncUrl;

      if (!nextUrl) {
        throw new Error("No next url found");
      }

      const newToken = new URL(nextUrl).searchParams.get("sync_token");
      if (!newToken) {
        throw new Error("No sync token found");
      }

      if (nextPageUrl) {
        remainingTokens.push(newToken);
      }

      const products = data.items.map(fromContentfulItemToProduct);
      await this.productRepository.save(products);

      if (nextSyncUrl) {
        await this.contentfulService.updateSyncToken(newToken);
      }
    }
    this.logger.log("Products synced and token updated");
  }
}
