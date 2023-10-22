import {  IsNotEmpty } from 'class-validator';

export class UpdateQrCountDto {

  @IsNotEmpty()
  count: number;
}
