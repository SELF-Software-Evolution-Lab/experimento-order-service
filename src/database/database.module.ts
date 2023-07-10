import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/service/config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.getTypeOrmModuleOptions(),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
})
export class DatabaseModule {}
