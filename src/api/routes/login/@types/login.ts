import { IsString, IsNotEmpty, IsJWT } from 'class-validator'

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class LoginResponse {
  @IsJWT()
  token: string
}
