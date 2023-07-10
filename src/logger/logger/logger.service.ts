import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '../../config/service/config/config.service';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger;

  constructor(private readonly configService: ConfigService) {
    const logLevel = this.configService.get('LOG_LEVEL') ?? 'info';
    this.logger = createLogger({
      level: logLevel,
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console()],
    });
  }

  log(message: string) {
    this.logger.log({ message });
  }

  error(message: string, trace: string) {
    this.logger.error({ message, trace });
  }

  warn(message: string) {
    this.logger.warn({ message });
  }

  debug(message: string) {
    this.logger.debug({ message });
  }

  verbose(message: string) {
    this.logger.verbose({ message });
  }
}
