import { IsJWT, IsAlphanumeric, IsAscii, Length, IsNumber, IsPositive, IsInt } from 'class-validator'

export class LoginBody {
  @IsAlphanumeric()
  username: string

  @IsAscii()
  @Length(12, 30)
  password: string
}

export class LoginResponse {
  @IsJWT()
  token: string

  @IsNumber()
  @IsPositive()
  @IsInt()
  expiresInSeconds: number
}
