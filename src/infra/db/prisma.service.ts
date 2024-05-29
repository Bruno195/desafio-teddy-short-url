import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      this.logger.debug(`Connecting to database...`);
      await this.$connect();
      this.logger.debug(`Connection established`);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async onModuleDestroy() {
    this.logger.debug('Disconnecting from database...');
    await this.$disconnect();
    this.logger.debug('Disconnected from database');
  }
}
