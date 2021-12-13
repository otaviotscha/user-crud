import { IsAlpha, IsAlphanumeric, IsAscii, IsEmail, IsISO8601, IsOptional, IsUUID, Length } from 'class-validator'

/**
 * Request.
 */
export class UpdateUserRequest {
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

/**
 * Response.
 */
export class UpdateUserResponse {
  @IsUUID()
  id: string

  @IsISO8601({ strict: true })
  updatedAt: string
}
