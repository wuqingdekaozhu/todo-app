import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';


// +------------------------------------------------------------------------------------------------------------------------+
// | main entry function                                                                                                    |
// +------------------------------------------------------------------------------------------------------------------------+
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);                                      // init nest app

  app.enableCors({                                                                      // enable cors for all routes
    origin: 'http://localhost:3000',                                                    // client endpoint
    methods: 'GET,POST,PUT,DELETE',                                                     // allowed http methods
    allowedHeaders: 'Content-Type, Authorization',                                      // allowed headers
  });

  await app.listen(3001);                                                               // app listen on port 3001
}

bootstrap();
