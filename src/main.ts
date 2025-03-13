import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

void NestFactory.create(AppModule).then((app) => {
  const config = new DocumentBuilder()
    .setTitle("Products Fetcher API")
    .setDescription("API for the Products Fetcher application")
    .setVersion("1.0")
    .addTag("products")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, documentFactory);
  return app.listen(process.env.PORT ?? 3000);
});
