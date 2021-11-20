import { logger } from './logger'

export const logThrownError = (message: unknown): void => {
  const errorMessage = `Error: ${message}`
  logger.error(errorMessage)
  throw new Error(errorMessage)
}
