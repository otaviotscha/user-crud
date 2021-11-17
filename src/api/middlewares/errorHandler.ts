import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(error: any, request: Request, response: Response, next: NextFunction) {
    response.status(400)

    const responseJSONError = {
      code: response.statusCode,
      message: error.message,
      errors: error.errors
    }

    response.json(responseJSONError)

    next()
  }
}
