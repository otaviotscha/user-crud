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

    const foundUser = await findByUsername(login.username)
    if (login.password !== foundUser.password) throw new UnauthorizedError('Incorrect password')

    logger.info(`User "${foundUser.id}" has successfully logged in`)
    return { token: sign({ id: foundUser.id, username: foundUser.username }, SECRET) }
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
    where: { username },
    select: { id: true, username: true, password: true }
  })
  if (!foundUser) throw new NotFoundError(`User was not found`)
  return foundUser
}
