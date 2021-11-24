import { IsOptional, IsString, IsNotEmpty, IsEmail, IsUUID, IsDateString } from 'class-validator'

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
  @IsEmail()
  email?: string
}

export class UpdateUserResponse {
  @IsUUID()
  id: string

  @IsDateString()
  updatedAt: string
}
