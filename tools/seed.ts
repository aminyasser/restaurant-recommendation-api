import { NestFactory } from '@nestjs/core';
import { SeederModule } from '../src/database/seeder.module';
import { SeederService } from '../src/database/seeder.service';

(async () => {
  const app = await NestFactory.createApplicationContext(SeederModule, {
    logger: ['log', 'warn', 'error'],
  });
  await app.get(SeederService).seed();
  await app.close();
})();
