import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { sign } from 'jsonwebtoken'

import { prisma } from '~/common/database'
import { logThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'
import { LoginBody } from './@types/login'
import { SECRET } from '~/config/env'

/**
 * Login service.
 */
export const login = async (login: LoginBody) => {
  try {
    logger.info('=== Login:login ===')

    logger.info(`Searching user`)
    const foundUser = await findByUsername(login.username)
    if (login.password !== foundUser.password) throw new UnauthorizedError('Incorrect password')

    return { token: sign(JSON.stringify(login), SECRET) }
  } catch (error) {
    logThrownError(error)
  } finally {
    logger.info('=== /Login:login ===')

    prisma.$disconnect()
  }
}

/**
 * Finds user by username.
 */
export const findByUsername = async (username: string) => {
  logger.info(`Searching user by username "${username}"`)
  const foundUser = await prisma.user.findFirst({
    where: { username }
  })
  if (!foundUser) throw new NotFoundError(`User was not found`)
  return foundUser
}
