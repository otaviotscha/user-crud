import { IsAlpha, IsAlphanumeric, IsEmail, IsUUID, Length } from 'class-validator'

/**
 * Response.
 */
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
