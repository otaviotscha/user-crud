import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID, IsDateString } from 'class-validator'

/**
 * Request.
 */
export class CreateAddressRequest {
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

/**
 * Response.
 */
export class CreateAddressResponse {
  @IsUUID()
  id: string

  @IsDateString()
  createdAt: string
}
