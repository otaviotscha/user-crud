import { NotFoundError } from 'routing-controllers'

/**
 * Helpers / common.
 */
import { prisma } from '~/common/database'
import { handleThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'
import { redisClient } from '~/common/redis'
import { hashPassword } from '~/api/helpers/password'

/**
 * Types.
 */
import { CreateUserRequest, CreateUserResponse } from './@types/createUser'
import { UpdateUserRequest, UpdateUserResponse } from './@types/updateUser'

/**
 * Finds an user.
 */
export const findOne = async (id: string) => {
  try {
    logger.info('=== User:findOne ===')
    return findById(id)
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /User:findOne ===')

    prisma.$disconnect()
  }
}

/**
 * Creates a new user.
 */
export const create = async (data: CreateUserRequest): Promise<CreateUserResponse> => {
  try {
    logger.info('=== User:create ===')

    logger.info(`Creating user`)
    data.password = hashPassword(data.password)
    const { id, createdAt } = await prisma.user.create({
      data
    })
    logger.info(`User "${id}" was successfully created`)

    return { id, createdAt: createdAt.toISOString() }
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /User:create ===')

    prisma.$disconnect()
  }
}

/**
 * Updates an existing user.
 */
export const update = async (id: string, data: UpdateUserRequest): Promise<UpdateUserResponse> => {
  try {
    logger.info('=== User:update ===')

    /**
     * Checks if element really is in database to return the
     * correct response (not found or continue to successful
     * update).
     */
    await findById(id)

    logger.info(`Updating user ${JSON.stringify({ id, ...data })}`)

    /**
     * Hashing password and removing it from Redis to force login.
     */
    if (data.password) {
      data.password = hashPassword(data.password)
      await redisClient.removeLoggedUserById(id)
    }

    const { updatedAt } = await prisma.user.update({
      where: { id },
      data
    })

    logger.info(`User "${id}" successfully updated`)
    return { id, updatedAt: updatedAt.toISOString() }
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /User:update ===')

    prisma.$disconnect()
  }
}
/**
 * Removes an user.
 */
export const remove = async (id: string) => {
  try {
    logger.info('=== User:remove ===')

    await findById(id)

    logger.info(`Deleting user "${id}"`)
    await prisma.user.delete({ where: { id } })
    logger.info(`User "${id}" successfully deleted`)
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /User:remove ===')

    prisma.$disconnect()
  }
}

/**
 * Finds user by id.
 */
const findById = async (id: string) => {
  logger.info(`Searching user "${id}"`)
  const foundUser = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      username: true,
      password: false,
      firstName: true,
      lastName: true,
      email: true,
      addresses: true
    }
  })
  if (!foundUser) throw new NotFoundError(`User "${id}" was not found`)
  return foundUser
}
