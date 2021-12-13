import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID, IsDateString } from 'class-validator'

/**
 * Request.
 */
export class UpdateAddressRequest {
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
export class UpdateAddressResponse {
  @IsUUID()
  id: string

  @IsDateString()
  updatedAt: string
}
