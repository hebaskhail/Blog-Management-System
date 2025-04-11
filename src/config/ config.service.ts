import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './database.config'; // Path to your database config

@Injectable()
export class ConfigAppService {
  constructor(private configService: ConfigService) {}

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return getTypeOrmConfig(this.configService);
  }
}

