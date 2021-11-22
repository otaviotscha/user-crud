import { Action, ForbiddenError, InternalServerError, UnauthorizedError } from 'routing-controllers'
import { decode } from 'jsonwebtoken'

import { logger } from '~/common/logger'

/**
 * Types.
 */
import { UserInfo } from './@types/userInfo'

export const currentUserChecker = async (action: Action): Promise<UserInfo> => {
  try {
    logger.info('=== CurrentUser:checker ===')

    const token = action.request.headers['authorization']
    if (!token) throw new UnauthorizedError('Missing authorization header')

    const decodedToken = decode(token, { json: true })
    if (!decodedToken) throw new ForbiddenError('Failed to get current user info')

    return { id: decodedToken.id, username: decodedToken.username }
  } catch (error) {
    logger.error((error as Error).message)
    if (!(error instanceof Error)) throw new InternalServerError('Unexpected error')
    throw Error
  } finally {
    logger.info('=== /CurrentUser:checker===')
  }
}
