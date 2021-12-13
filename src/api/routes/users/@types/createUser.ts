import { IsAlpha, IsAlphanumeric, IsAscii, IsEmail, IsISO8601, IsUUID, Length } from 'class-validator'

/**
 * Request.
 */
export class CreateUserRequest {
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

/**
 * Response.
 */
export class CreateUserResponse {
  @IsUUID()
  id: string

  @IsISO8601({ strict: true })
  createdAt: string
}
