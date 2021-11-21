import { Get, HttpCode, JsonController, OnUndefined } from 'routing-controllers'

@JsonController('/health-check')
export class HealthCheckController {
  @Get('/')
  @HttpCode(204)
  @OnUndefined(204)
  getAll() {}
}
