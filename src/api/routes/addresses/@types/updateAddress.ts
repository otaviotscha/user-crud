import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID, IsDateString } from 'class-validator'

export class UpdateAddressBody {
  @IsNumber()
  @IsPositive()
  number: number

  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
  city: string
  email?: string
}

export class UpdateAddressResponse {
  @IsUUID()
  id: string

  @IsDateString()
  updatedAt: string
}
