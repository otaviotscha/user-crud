import { prisma } from '~/common/database'
import { handleThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'
import { redisClient } from '~/common/redis'

/**
 * Types.
 */
import { UserInfo } from '~/api/helpers/@types/token'

/**
 * Login service.
 */
export const logout = async (user: UserInfo): Promise<void> => {
  try {
    logger.info('=== Logout:logout ===')

    /**
     * Removes user from Redis.
     */
    await redisClient.removeLoggedUserById(user.id)
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /Logout:logout ===')
  }
}
