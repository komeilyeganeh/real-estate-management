import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeasesModule } from './modules/leases/leases.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UnitsModule } from './modules/units/units.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { TenantsModule } from './modules/tenants/tenants.module';

@Module({
  imports: [
    LeasesModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UnitsModule,
    PropertiesModule,
    TenantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
