import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Charitee')
    .setDescription(
      'This is the backbone API for Charitee, a platform to find the best matching charity for you!',
    )
    .setVersion(process.env.npm_package_version)
    .setTermsOfService(`${process.env.SERVER_HOST}/tos`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
