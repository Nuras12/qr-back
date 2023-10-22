import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/qr.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],

  controllers: [QrController],
  providers: [QrService, JwtService],
})
export class QrModule {}
