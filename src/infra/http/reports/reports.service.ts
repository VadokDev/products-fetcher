import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/domain/entities/product.entity";
import { Between, IsNull, Repository } from "typeorm";
import { IReportDTO } from "./reports.dto";

export class ReportsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async get(config: {
    startDate?: string;
    endDate?: string;
    withoutPrice?: boolean;
  }): Promise<IReportDTO> {
    const totalProducts = await this.productRepository.count({
      withDeleted: true,
    });
    const storedProducts = await this.productRepository.count();
    const deletedProducts = totalProducts - storedProducts;

    const { startDate, endDate, withoutPrice } = config;
    const where = {
      ...(withoutPrice ? { price: IsNull() } : {}),
      ...(startDate && endDate
        ? { originalCreatedAt: Between(new Date(startDate), new Date(endDate)) }
        : {}),
    };

    const nonDeletedProducts = await this.productRepository.count({ where });

    const deletedPercentage = (deletedProducts / totalProducts) * 100;
    const storedPercentage = (nonDeletedProducts / totalProducts) * 100;

    const quantityByBrand = await this.productRepository
      .createQueryBuilder()
      .select("brand")
      .addSelect("COUNT(*)")
      .groupBy("brand")
      .getRawMany<{ brand: string; count: string }>()
      .then((res) =>
        res.map(({ brand, count }) => ({ brand, count: parseInt(count, 10) })),
      );

    return { deletedPercentage, storedPercentage, quantityByBrand };
  }
}
