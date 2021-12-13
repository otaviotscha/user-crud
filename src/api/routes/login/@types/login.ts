import { IsJWT, IsAlphanumeric, IsAscii, Length, IsNumber, IsPositive, IsInt, IsNotEmpty } from 'class-validator'

/**
 * Request.
 */
export class LoginRequest {
  @IsAlphanumeric()
  username: string

  @IsAscii()
  @Length(12, 30)
  password: string
}

/**
 * Response.
 */
export class LoginResponse {
  @IsJWT()
  token: string

  @IsNumber()
  @IsPositive()
  @IsInt()
  expiresInSeconds: number
}

/**
 * Response when already logged in.
 */
export class AlreadyLoggedIn {
  @IsNotEmpty()
  message: string
}
