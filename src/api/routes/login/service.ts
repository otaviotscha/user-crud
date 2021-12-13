import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { sign } from 'jsonwebtoken'

import { prisma } from '~/common/database'
import { handleThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'
import { redisClient } from '~/common/redis'
import { comparePasswords } from '~/api/helpers/password'

/**
 * Environment;
 */
import { TOKEN_EXPIRATION, TOKEN_SECRET } from '~/config/env'

/**
 * Types.
 */
import { AlreadyLoggedIn, LoginRequest, LoginResponse } from './@types/login'

/**
 * Login service.
 */
export const login = async (login: LoginRequest): Promise<LoginResponse | AlreadyLoggedIn> => {
  try {
    logger.info('=== Login:login ===')

    /**
     * Found user by username (unique).
     */
    const foundUser = await findByUsername(login.username)

    /**
     * If user is already logged in, returns a message so the user knows it.
     * This is considered a success.
     */
    if (await redisClient.isUserLoggedIn(foundUser.id)) {
      const message = `User "${foundUser.id}" already logged in`
      logger.info(message)
      return { message }
    }

    /**
     * Checks if the received password matches the hashed one in database.
     */
    if (!comparePasswords(login.password, foundUser.password)) throw new UnauthorizedError('Incorrect password')

    /**
     * Generated token using user info.
     */
    const token = sign({ iat: Date.now(), sub: foundUser.id }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION })
    logger.info(`User "${foundUser.id}" has successfully logged in`)

    /**
     * Adds user to Redis as logged in.
     */
    await redisClient.addLoggedUser(foundUser.id, token)

    return { token, expiresInSeconds: parseInt(TOKEN_EXPIRATION) }
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
