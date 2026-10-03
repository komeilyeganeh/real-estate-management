import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeasesModule } from './modules/leases/leases.module';

@Module({
  imports: [LeasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
