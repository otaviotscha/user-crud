import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID, IsDateString } from 'class-validator'

export class CreateAddressBody {
  @IsNumber()
  @IsPositive()
  number: number

  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
  city: string
}

export class CreateAddressResponse {
  @IsUUID()
  id: string

  @IsDateString()
  createdAt: string
}
