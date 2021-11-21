import { IsString, IsNotEmpty, IsNumber, IsPositive, Max, IsOptional, IsEmail, IsUUID, IsDateString } from 'class-validator'

export class CreateUserBody {
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
}

export class CreateUserResponse {
  @IsUUID()
  id: string

  @IsDateString()
  createdAt: string
}
