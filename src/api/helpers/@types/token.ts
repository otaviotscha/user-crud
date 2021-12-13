import { IsUUID } from 'class-validator'

/**
 * Token claims.
 */
export class JWTToken {
  iat: number
  exp: number
  sub: string
}

/**
 * Decoded user info from token.
 */
export class UserInfo {
  @IsUUID()
  id: string
}
