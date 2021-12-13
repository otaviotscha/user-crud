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

    const decodedToken = await getDecodedToken(action)

    return { id: decodedToken.sub }
  } catch (error) {
    throw handleThrownError
  } finally {
    logger.info('=== /CurrentUser:checker===')
  }
}
