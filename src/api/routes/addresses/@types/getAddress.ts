import { IsUUID, IsString, IsNotEmpty, IsNumber, IsPositive, IsDateString, IsOptional } from 'class-validator'

/**
 * Request query.
 */
export class GetAddressQuery {
  @IsOptional()
  @IsUUID()
  id: string

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  street: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string
}

/**
 * Response.
 */
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

  @IsUUID()
  userId: string
}
