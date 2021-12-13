import { Authorized, CurrentUser, HttpCode, JsonController, OnUndefined, Post } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'

/**
 * Types.
 */
import { UserInfo } from '~/api/helpers/@types/token'

/**
 * Services.
 */
import * as logoutService from './service'

/**
 * Controller.
 */
@JsonController('/logout')
export class LogoutController {
  @Post()
  @OpenAPI({ summary: 'Logs out', security: [{ bearerAuth: [] }] })
  @Authorized()
  @HttpCode(204)
  @OnUndefined(204)
  logout(@CurrentUser() user: UserInfo) {
    return logoutService.logout(user)
  }
}
