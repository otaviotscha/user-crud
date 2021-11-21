import { InternalServerError } from 'routing-controllers'

import { logger } from './logger'

export const logThrownError = (error: unknown): void => {
  if (!(error instanceof Error)) throw new InternalServerError('Unexpected error')
  logger.error(error.message)
  throw error
}
