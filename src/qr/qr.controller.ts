import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QrService } from './qr.service';
import { UpdateQrCountDto } from './dto/update-qr.dto';
import { AuthGuard } from 'src/guard';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.qrService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQrDto: UpdateQrCountDto) {
    return this.qrService.update(id, updateQrDto.count);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  fill() {

    return this.qrService.createBulk();
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.qrService.getAll();
  }
}
