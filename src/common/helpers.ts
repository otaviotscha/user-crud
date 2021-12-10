import { JsonWebTokenError } from 'jsonwebtoken'
import { UnauthorizedError } from 'routing-controllers'

import { logger } from './logger'

/**
 * Checks if structure is instance of Error.
 */
const isError = (structure: unknown): structure is Error => structure instanceof Error

/**
 * Logs error and if it is a request error, returns the response body, else returns error as received.
 */
export const handleThrownError = (error: unknown): Error => {
  if (!isError(error)) {
    logger.error('Tried to throw something that is not an instance of Error')
    return new Error('Tried to throw something that is not an instance of Error')
  }

  /**
   * Converts JWT error into unauthorized error.
   */
  if (error instanceof JsonWebTokenError) {
    logger.error(error.message)
    return new UnauthorizedError(error.message)
  }

  /**
   * If it is a simple error, just logs an then returns it.
   */
  logger.error(error.message)
  return error
}
