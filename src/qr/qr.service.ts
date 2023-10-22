import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/qr.entity';
import { Repository } from 'typeorm';
var XLSX = require('xlsx');

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
  ) {}

  async getAll() {
    return await this.ticketRepo.find();
  }

  async createBulk() {
    const data = fromXslx();

    const previous = await this.ticketRepo.find();
    this.ticketRepo.save(previous.map((i) => ({ ...i, is_active: false })));

    const toCreate = data.map(({ name, quantity }) => ({
      name: name,
      available_num: quantity,
      quantity: quantity,
    }));

    await this.ticketRepo.save(toCreate);
  }

  async findOne(id: string) {
    console.log({ id });

    const ticket = await this.ticketRepo.findOne({ where: { name: id } });

    if (!ticket) {
      return Promise.reject({
        statusCode: 404,
        message: 'Ticket not found',
      });
    }

    return { available: ticket.available_num, total: ticket.quantity };
  }

  async update(id: string, ticketNum: number) {
    const ticket = await this.ticketRepo.findOne({ where: { name: id } });

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

function fromXslx(): { name: string; quantity: number }[] {
  var workbook = XLSX.readFile('master.xlsx');
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData;
}
