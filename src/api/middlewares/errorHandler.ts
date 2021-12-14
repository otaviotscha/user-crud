import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'

/**
 * Error handling middleware.
 */
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  // TODO: error type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(error: any, request: Request, response: Response, next: NextFunction) {
    /**
     * Status 500 is to guarantee that uncaught errors are not going to return success statuses.
     */
    response.statusCode = error.httpCode ? error.httpCode : 500

    /**
     * Body.
     */
    const responseJSONError = {
      code: response.statusCode,
      message: error.message,
      errors: error.errors
    }
    response.json(responseJSONError)

    next()
  }
}
