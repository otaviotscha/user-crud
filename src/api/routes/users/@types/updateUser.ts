import { IsOptional, IsString, IsNotEmpty, IsNumber, IsPositive, Max, IsEmail, IsUUID, IsDateString } from 'class-validator'

export class UpdateUserBody {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(200)
  age: number

  @IsOptional()
  @IsEmail()
  email?: string
}

export class UpdateUserResponse {
  @IsUUID()
  id: string

  @IsDateString()
  updatedAt: string
}
