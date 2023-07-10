import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { OrderEntity } from 'src/order/entity/order.entity/order.entity';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get(key: string): string {
    return this.nestConfigService.get(key);
  }

  getTypeOrmModuleOptions(): TypeOrmModuleOptions {
    return {
      host: this.nestConfigService.get('POSTGRES_HOST'),
      port: +this.nestConfigService.get('POSTGRES_PORT'),
      database: this.nestConfigService.get('POSTGRES_DATABASE'),
      username: this.nestConfigService.get('POSTGRES_USERNAME'),
      password: this.nestConfigService.get('POSTGRES_PASSWORD'),
      type: 'postgres',
      entities: [OrderEntity],
      synchronize: this.nestConfigService.get('NODE_ENV') === 'test',
      dropSchema: this.nestConfigService.get('NODE_ENV') === 'test',
    };
  }

  getAwsRegion(): string {
    return this.get('AWS_REGION');
  }
  getAwsAccessKey(): string {
    return this.get('AWS_ACCESS_KEY_ID');
  }
  getAwsSecret(): string {
    return this.get('AWS_SECRET_ACCESS_KEY');
  }

  getAwsSqsArn(): string {
    return this.get('AWS_SQS_URL');
  }

  getAwsSnsOrigin(): string {
    return this.get('AWS_SNS_ORIGIN');
  }
}
