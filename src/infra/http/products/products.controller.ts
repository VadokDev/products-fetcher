import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@dataui/crud";
import { Product } from "src/domain/entities/product.entity";
import { ProductsService } from "./products.service";

@Crud({
  model: {
    type: Product,
  },
  params: {
    id: {
      field: "id",
      type: "string",
      primary: true,
    },
  },
  query: {
    softDelete: true,
    alwaysPaginate: true,
    maxLimit: 5,
  },
  routes: {
    exclude: [
      "createOneBase",
      "createManyBase",
      "updateOneBase",
      "replaceOneBase",
      "recoverOneBase",
      "getOneBase",
    ],
  },
})
@Controller("products")
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}
}
