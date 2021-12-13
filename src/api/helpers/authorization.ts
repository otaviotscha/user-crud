import { Action, UnauthorizedError } from 'routing-controllers'

import { handleThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'
import { redisClient } from '~/common/redis'
import { getDecodedToken } from './token'

export const authorizationChecker = async (action: Action): Promise<boolean> => {
  try {
    logger.info('=== Auth:checker ===')

    /**
     * JWT token decoded from header.
     */
    const decodedToken = await getDecodedToken(action)

    /**
     * Checking if user got from token is already logged in.
     */
    logger.info('Checking if user is logged in')
    const alreadyLoggedIn = await redisClient.isUserLoggedIn(decodedToken.sub)
    if (!alreadyLoggedIn) throw new UnauthorizedError('User is not logged in')

    logger.info('Success')
    return true
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /Auth:checker ===')
  }
}
