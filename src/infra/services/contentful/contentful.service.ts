import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { IContentfulDeliveryResponse } from "./contentful.interfaces";
import contentfulConfig from "./contentful.config";
import { Contentful } from "./contentful.entity";
import { Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { firstValueFrom } from "rxjs";

type FetchResponse = Promise<AxiosResponse<IContentfulDeliveryResponse>>;

@Injectable()
export class ContentfulService {
  @Inject(contentfulConfig.KEY)
  private readonly config: ConfigType<typeof contentfulConfig>;

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Contentful)
    private readonly contentfulRepository: Repository<Contentful>,
  ) {}

  async getSyncToken(): Promise<string | undefined> {
    return this.contentfulRepository
      .findOne({
        where: { option: "syncToken" },
        select: ["value"],
      })
      .then((result) => result?.value);
  }

  async updateSyncToken(syncToken: string): Promise<UpdateResult> {
    return this.contentfulRepository.update(
      { option: "syncToken" },
      { value: syncToken },
    );
  }

  async fetch(syncToken?: string): FetchResponse {
    const { spaceId, accessToken, environment, contentType } = this.config;

    const action = {
      init: {
        access_token: accessToken,
        content_type: contentType,
        type: "Entry",
        initial: "true",
      },
      sync: {
        access_token: accessToken,
        sync_token: syncToken || "",
      },
    };

    const params = new URLSearchParams(syncToken ? action.sync : action.init);
    const path = `spaces/${spaceId}/environments/${environment}/sync`;
    const url = `${path}?${params.toString()}`;

    return firstValueFrom(this.httpService.get(url));
  }
}
