import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive, Max, IsEmail } from 'class-validator'

export class UserCreationData {
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
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string
}

export class UserUpdateData {
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
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string
}
