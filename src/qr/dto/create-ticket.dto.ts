import {  IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

class TicketDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  isRefunded: boolean;
}


export class CreateTicketsDto {

  @IsArray()
  @ValidateNested({ each: true })
  tickets: TicketDto[];
}
