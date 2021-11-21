import { IsUUID, IsString, IsNotEmpty, IsNumber, IsPositive, Max, IsOptional, IsEmail, IsDateString } from 'class-validator'

export class GetUserResponse {
  @IsUUID()
  id: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsNumber()
  @IsPositive()
  @Max(200)
  age: number

  @IsOptional()
  @IsEmail()
  email?: string

  @IsDateString()
  createdAt: string

  @IsDateString()
  updatedAt: string
}
