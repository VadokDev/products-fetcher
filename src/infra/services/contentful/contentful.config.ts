import * as Joi from "joi";
import { registerAs } from "@nestjs/config";

export default registerAs("contentful", () => {
  const config = {
    baseURL: process.env.CONTENTFUL_BASE_URL || "",
    spaceId: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
    environment: process.env.CONTENTFUL_ENVIRONMENT || "",
    contentType: process.env.CONTENTFUL_CONTENT_TYPE || "",
  };

  const schema = Joi.object({
    baseURL: Joi.string().uri().required(),
    spaceId: Joi.string().required(),
    accessToken: Joi.string().required(),
    environment: Joi.string().required(),
    contentType: Joi.string().required(),
  });

  const { error } = schema.validate(config);

  if (error) {
    throw new Error(`Contentful config validation error: ${error.message}`);
  }

  return config;
});
