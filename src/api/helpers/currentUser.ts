import { Action } from 'routing-controllers'

import { logger } from '~/common/logger'
import { handleThrownError } from '~/common/helpers'
import { getDecodedToken } from './token'

/**
 * Types.
 */
import { UserInfo } from './@types/token'

export const currentUserChecker = async (action: Action): Promise<UserInfo> => {
  try {
    logger.info('=== CurrentUser:checker ===')

    /**
     * JWT token decoded from header.
     */
    const decodedToken = await getDecodedToken(action)

    logger.info(`Returning user id "${decodedToken.sub}"`)
    return { id: decodedToken.sub }
  } catch (error) {
    throw handleThrownError
  } finally {
    logger.info('=== /CurrentUser:checker===')
  }
}
