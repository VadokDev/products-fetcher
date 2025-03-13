export interface IReportDTO {
  deletedPercentage: number;
  storedPercentage: number;
  quantityByBrand: { brand: string; count: number }[];
}

export interface IGetReportDTO {
  startDate?: string;
  endDate?: string;
  withoutPrice?: string;
}
