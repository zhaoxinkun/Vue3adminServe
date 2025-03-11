import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(cookieParser()); // ✅ 必须添加 cookie-parser
  await app.listen(process.env.PORT ?? 3000);

  // HMR
  if (module.hot) {
    module.hot.accept();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    module.hot.dispose(() => app.close());  //hot报错,安装模块-D @types/webpack-env
  }
}

bootstrap();
