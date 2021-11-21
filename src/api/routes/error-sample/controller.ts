import { Get, HttpCode, JsonController, OnUndefined } from 'routing-controllers'

@JsonController('/error-sample')
export class ErrorSampleController {
  @Get()
  @HttpCode(400)
  @OnUndefined(400)
  getAll() {
    throw new Error('This is an example of error message')
  }
}
