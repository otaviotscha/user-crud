import { Body, HttpCode, JsonController, OnUndefined, Post } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

/**
 * Types.
 */
import { LoginRequest, LoginResponse } from './@types/login'

/**
 * Services.
 */
import * as loginService from './service'

/**
 * Controller.
 */
@JsonController('/login')
export class LoginController {
  @Post()
  @OpenAPI({ summary: 'Gets a token' })
  @ResponseSchema(LoginResponse)
  @HttpCode(200)
  @OnUndefined(400)
  post(@Body() login: LoginRequest) {
    return loginService.login(login)
  }
}
