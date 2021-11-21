import { IsUUID, IsString, IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator'

export class GetAddressResponse {
  @IsUUID()
  id: string

  @IsNumber()
  @IsPositive()
  number: number

  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsDateString()
  createdAt: string

  @IsDateString()
  updatedAt: string
}
