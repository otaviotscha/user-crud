import { Get, JsonController, OnUndefined } from 'routing-controllers'

@JsonController('/error-sample')
export class ErrorSampleController {
  @Get('/')
  @OnUndefined(204)
  getAll() {
    throw new Error('This is an example of error message')
  }
}
