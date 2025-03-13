import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { ReportsService } from "./reports.service";
import * as Joi from "joi";
import { IGetReportDTO } from "./reports.dto";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getReports(@Query() query: IGetReportDTO) {
    const { startDate, endDate, withoutPrice } = query;
    const schema = Joi.object({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      withoutPrice: Joi.string().valid("true", "false").optional(),
    });
    const { error } = schema.validate(query);

    if (startDate && endDate && error) {
      throw new Error(`Validation error: ${error.message}`);
    }

    const config = {
      startDate,
      endDate,
      withoutPrice: withoutPrice === "true",
    };
    return this.reportsService.get(config);
  }
}
