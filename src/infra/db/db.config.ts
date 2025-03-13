import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as Joi from "joi";

export default registerAs("database", (): TypeOrmModuleOptions => {
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNC === "true",
  };

  const schema = Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
    synchronize: Joi.boolean().default(false),
  });

  const { error } = schema.validate(config);

  if (error) {
    throw new Error(`Database config validation error: ${error.message}`);
  }
  return {
    ...config,
    type: "postgres",
    autoLoadEntities: true,
    entities: [__dirname + "/../../**/*.entity{.ts,.js}"],
  };
});
