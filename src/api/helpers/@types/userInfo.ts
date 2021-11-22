import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class UserInfo {
  @IsUUID()
  id: string

  @IsString()
  @IsNotEmpty()
  username: string
}
