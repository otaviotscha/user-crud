import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { sign } from 'jsonwebtoken'

import { prisma } from '~/common/database'
import { handleThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'

/**
 * Environment;
 */
import { SECRET, TOKEN_EXPIRATION } from '~/config/env'

/**
 * Types.
 */
import { LoginBody } from './@types/login'

/**
 * Login service.
 */
export const login = async (login: LoginBody) => {
  try {
    logger.info('=== Login:login ===')

    const foundUser = await findByUsername(login.username)
    if (login.password !== foundUser.password) throw new UnauthorizedError('Incorrect password')

    const token = sign({ id: foundUser.id, username: foundUser.username }, SECRET, { expiresIn: TOKEN_EXPIRATION })
    logger.info(`User "${foundUser.id}" has successfully logged in`)
    return { token, expiresInSeconds: TOKEN_EXPIRATION }
  } catch (error) {
    throw handleThrownError(error)
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
