import { NotFoundError } from 'routing-controllers'

import { prisma } from '~/common/database'
import { logThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'

/**
 * Types.
 */
import { CreateUserBody, UpdateUserBody } from './@types/user'

/**
 * Finds an user.
 */
export const findOne = async (id: string) => {
  try {
    logger.info('=== User:findOne ===')
    return findById(id)
  } catch (error) {
    logThrownError(error)
  } finally {
    logger.info('=== /User:findOne ===')

    prisma.$disconnect()
  }
}

/**
 * Creates a new user.
 */
export const create = async (data: CreateUserBody) => {
  try {
    logger.info('=== User:create ===')

    logger.info(`Creating user "${JSON.stringify(data)}"`)
    const { id, createdAt } = await prisma.user.create({
      data
    })
    logger.info(`User "${id}" was successfully created`)

    return { id, createdAt }
  } catch (error) {
    logThrownError(error)
  } finally {
    logger.info('=== /User:create ===')

    prisma.$disconnect()
  }
}

/**
 * Updates an existing user.
 */
export const update = async (id: string, data: UpdateUserBody) => {
  try {
    logger.info('=== User:update ===')

    await findById(id)

    logger.info(`Updating user ${JSON.stringify({ id, ...data })}`)
    const { updatedAt } = await prisma.user.update({
      where: { id },
      data: data
    })

    logger.info(`User ${id} successfully updated`)
    return { id, updatedAt }
  } catch (error) {
    logThrownError(error)
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
    logThrownError(error)
  } finally {
    logger.info('=== /User:remove ===')

    prisma.$disconnect()
  }
}

/**
 * Finds user by id.
 */
export const findById = async (id: string) => {
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
      Address: true
    }
  })
  if (!foundUser) throw new NotFoundError(`User "${id}" was not found`)
  return foundUser
}
