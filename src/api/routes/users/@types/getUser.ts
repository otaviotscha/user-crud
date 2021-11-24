import { IsUUID, IsString, IsNotEmpty, IsOptional, IsEmail, IsDateString, IsArray, IsObject, IsInstance } from 'class-validator'
import { GetAddressResponse } from '../../addresses/@types/getAddress'

export class GetUserResponse {
  @IsUUID()
  id: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsDateString()
  createdAt: string

  @IsDateString()
  updatedAt: string

  @IsArray()
  @IsObject()
  @IsInstance(GetAddressResponse, { each: true })
  Address: GetAddressResponse[]
}
