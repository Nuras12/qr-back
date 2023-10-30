import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/qr.entity';
import { Repository } from 'typeorm';
import { CreateTicketsDto } from './dto/create-ticket.dto';
var XLSX = require('xlsx');

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
  ) {}

  async getAll() {
    return await this.ticketRepo.find({ where: { is_active: true } });
  }

  async createBulk(data: CreateTicketsDto) {
    const previous = await this.ticketRepo.find();
    this.ticketRepo.save(previous.map((i) => ({ ...i, is_active: false })));

    const toCreate = data.tickets.map(({ id, quantity, isRefunded }) => ({
      name: id,
      available_num: quantity,
      quantity: quantity,
      refunded: isRefunded,
    }));

    await this.ticketRepo.save(toCreate);
  }

  async findOne(id: string) {
    console.log({ id });

    const ticket = await this.ticketRepo.findOne({
      where: { name: id, is_active: true },
    });

    if (!ticket) {
      return Promise.reject({
        statusCode: 404,
        message: 'Ticket not found',
      });
    }

    if (ticket.refunded) {
      return Promise.reject({
        statusCode: 422,
        message: 'Ticket refunded',
      });
    }

    return { available: ticket.available_num, total: ticket.quantity };
  }

  async findAll() {
    const tickets = this.ticketRepo.findOne({
      where: { is_active: true },
    });

    return tickets;
  }

  async update(id: string, ticketNum: number) {
    const ticket = await this.ticketRepo.findOne({
      where: { name: id, is_active: true },
    });

    if (!ticket) {
      return Promise.reject({
        statusCode: 404,
        message: 'Ticket not found',
      });
    }

    if (ticketNum > ticket.available_num) {
      return Promise.reject({
        statusCode: 400,
        message: 'Not available such num for that id',
      });
    }

    this.ticketRepo.save({
      ...ticket,
      available_num: ticket.available_num - ticketNum,
    });

    return;
  }
}
