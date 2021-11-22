import { InternalServerError } from 'routing-controllers'

import { logger } from './logger'

/**
 * Logs error then throws an InternalServerError.
 */
export const logThrownError = (error: unknown): void => {
  logger.error((error as Error).message)
  if (!(error instanceof Error)) throw new InternalServerError('Unexpected error')
  throw error
}
