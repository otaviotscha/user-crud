import { IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString } from 'class-validator'

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
