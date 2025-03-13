export interface IContentfulField<T> {
  "en-US": T;
}

export interface IContentfulProductFields {
  sku: IContentfulField<string>;
  name: IContentfulField<string>;
  brand: IContentfulField<string>;
  model: IContentfulField<string>;
  category: IContentfulField<string>;
  color: IContentfulField<string>;
  price: IContentfulField<number>;
  currency: IContentfulField<string>;
  stock: IContentfulField<number>;
}

export interface IContentfulSys {
  type: string;
  id?: string;
  linkType?: string;
}

export interface IContentfulSpace {
  sys: IContentfulSys;
}

export interface IContentfulEnvironment {
  sys: IContentfulSys;
}

export interface IContentfulContentType {
  sys: IContentfulSys;
}

export interface IContentfulMetadata {
  tags: any[];
  concepts: any[];
}

export interface IContentfulItem {
  metadata: IContentfulMetadata;
  sys: {
    space: IContentfulSpace;
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: IContentfulEnvironment;
    publishedVersion: number;
    revision: number;
    contentType: IContentfulContentType;
  };
  fields: IContentfulProductFields;
}

export interface IContentfulFetchParams {
  nextPageUrl?: string;
  nextSyncUrl?: string;
}

export interface IContentfulDeliveryResponse extends IContentfulFetchParams {
  sys: { type: string };
  total?: number;
  skip?: number;
  limit?: number;
  items: IContentfulItem[];
}
