import { IContentfulItem } from "src/infra/services/contentful/contentful.interfaces";
import { Product } from "../entities/product.entity";

export const fromContentfulItemToProduct = (item: IContentfulItem): Product => {
  const partial = {
    id: item.sys.id,
    sku: item.fields.sku["en-US"],
    name: item.fields.name["en-US"],
    brand: item.fields.brand["en-US"],
    model: item.fields.model["en-US"],
    category: item.fields.category["en-US"],
    color: item.fields.color["en-US"],
    price: item.fields.price["en-US"],
    currency: item.fields.currency["en-US"],
    stock: item.fields.stock["en-US"],
    originalCreatedAt: new Date(item.sys.createdAt),
  };
  return new Product(partial);
};
