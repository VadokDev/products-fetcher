import { Product } from "src/domain/entities/product.entity";
import { Repository } from "typeorm";
import { SyncProductsUseCase } from "./sync-products.usecase";
import { ContentfulService } from "src/infra/services/contentful/contentful.service";

describe("SyncProductsUsecase Test Suite", () => {
  it("should get all the products when no sync token is found", async () => {
    const firstFetch = {
      data: {
        items: [],
        nextPageUrl: "http://localhost/?sync_token=1234",
      },
    };
    const secondFetch = {
      data: {
        items: [],
        nextSyncUrl: "http://localhost/?sync_token=5678",
      },
    };
    const updateSyncToken = jest.fn();
    const contentfulServiceMock = {
      getSyncToken: jest.fn(() => undefined),
      fetch: jest
        .fn()
        .mockImplementationOnce(() => firstFetch)
        .mockImplementationOnce(() => secondFetch),
      updateSyncToken,
    } as unknown as ContentfulService;
    const repository = { save: jest.fn() } as unknown as Repository<Product>;

    const usecase = new SyncProductsUseCase(contentfulServiceMock, repository);
    await usecase.execute();

    expect(updateSyncToken).toHaveBeenCalledTimes(1);
    expect(updateSyncToken).toHaveBeenNthCalledWith(1, "5678");
  });

  it("should throw an error when the nextUrl is not found", async () => {
    const firstFetch = {
      data: {
        items: [],
      },
    };
    const contentfulServiceMock = {
      getSyncToken: jest.fn(() => undefined),
      fetch: jest.fn(() => firstFetch),
    } as unknown as ContentfulService;
    const repository = { save: jest.fn() } as unknown as Repository<Product>;

    const usecase = new SyncProductsUseCase(contentfulServiceMock, repository);
    await expect(usecase.execute()).rejects.toThrow("No next url found");
  });

  it("should throw an error when the sync token is not found", async () => {
    const firstFetch = {
      data: {
        items: [],
        nextPageUrl: "http://localhost/?sync_token=1234",
      },
    };
    const secondFetch = {
      data: {
        items: [],
        nextSyncUrl: "http://localhost/",
      },
    };
    const contentfulServiceMock = {
      getSyncToken: jest.fn(() => undefined),
      fetch: jest
        .fn()
        .mockImplementationOnce(() => firstFetch)
        .mockImplementationOnce(() => secondFetch),
    } as unknown as ContentfulService;
    const repository = { save: jest.fn() } as unknown as Repository<Product>;

    const usecase = new SyncProductsUseCase(contentfulServiceMock, repository);
    await expect(usecase.execute()).rejects.toThrow("No sync token found");
  });
});
