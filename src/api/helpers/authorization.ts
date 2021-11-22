import { Action, InternalServerError, UnauthorizedError } from 'routing-controllers'
import { verify } from 'jsonwebtoken'

import { SECRET } from '~/config/env'
import { logger } from '~/common/logger'

export const authorizationChecker = async (action: Action): Promise<boolean> => {
  try {
    logger.info('=== Auth:checker ===')

    const token = action.request.headers['authorization']
    if (!token) throw new UnauthorizedError('Missing authorization header')

    verify(token, SECRET)
    logger.info('Success')
    return true
  } catch (error) {
    if (!(error instanceof Error)) throw new InternalServerError('Unexpected error')
    logger.error(error.message)
    throw error
  } finally {
    logger.info('=== /Auth:checker ===')
  }
}
