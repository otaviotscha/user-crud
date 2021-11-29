import { IsAlpha, IsAlphanumeric, IsAscii, IsDateString, IsEmail, IsISO8601, IsOptional, IsUUID, Length } from 'class-validator'

export class CreateUserBody {
  @IsAlphanumeric()
  username: string

  @IsAscii()
  @Length(12, 30)
  password: string

  @IsAlpha()
  @Length(2, 200)
  firstName: string

  @IsAlpha()
  @Length(2, 200)
  lastName: string

  @IsEmail()
  email: string
}

export class CreateUserResponse {
  @IsUUID()
  id: string

  @IsISO8601({ strict: true })
  createdAt: string
}

export class UpdateUserBody {
  @IsOptional()
  @IsAlphanumeric()
  username: string

  @IsOptional()
  @IsAscii()
  @Length(12, 30)
  password: string

  @IsOptional()
  @IsAlpha()
  @Length(2, 200)
  firstName: string

  @IsOptional()
  @IsAlpha()
  @Length(2, 200)
  lastName: string

  @IsOptional()
  @IsEmail()
  email: string
}

export class UpdateUserResponse {
  @IsUUID()
  id: string

  @IsDateString()
  updatedAt: string
}

export class GetUserResponse {
  @IsUUID()
  id: string

  @IsAlphanumeric()
  username: string

  @IsAlpha()
  @Length(2, 200)
  firstName: string

  @IsAlpha()
  @Length(2, 200)
  lastName: string

  @IsEmail()
  email: string
}
