import { Module } from '@nestjs/common';
import { KaspiWebhookService } from './kaspi-webhook.service';
import { KaspiWebhookController } from './kaspi-webhook.controller';

@Module({
  controllers: [KaspiWebhookController],
  providers: [KaspiWebhookService],
})
export class KaspiWebhookModule {}
