import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { KaspiWebhookService } from './kaspi-webhook.service';
  
@Controller('kaspi/webhook')
export class KaspiWebhookController {
  constructor(private readonly kaspiWebhookService: KaspiWebhookService) {}

  @Get(':id')
  async findOne(@Body() payload: any) {
    console.log({payload}, 'ID')
    return HttpStatus.OK
  }

  @Get()
  async findAll(@Body() payload: any) {
    console.log({payload})

    return HttpStatus.OK

  }

}
