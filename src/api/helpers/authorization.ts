import { Action, ForbiddenError, UnauthorizedError } from 'routing-controllers'
import { JsonWebTokenError, verify } from 'jsonwebtoken'

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
    logger.error((error as Error).message)
    if (error instanceof JsonWebTokenError) throw new ForbiddenError(error.message)
    throw error
  } finally {
    logger.info('=== /Auth:checker ===')
  }
}
