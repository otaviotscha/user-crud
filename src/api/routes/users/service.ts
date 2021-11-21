import { prisma } from '~/common/database'
import { logThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'
import { CreateUserBody } from './@types/createUser'

/**
 * Finds users accordingly to data received.
 */
export const findMany = async () => {
  try {
    logger.info('=== User:findMany ===')

    logger.info(`Searching all users`)
    const foundUsers = await prisma.user.findMany()
    logger.info(`Found "${foundUsers.length}" users.`)

    return foundUsers
  } catch ({ message }) {
    logThrownError(message)
  } finally {
    logger.info('=== /User:findMany ===')

    prisma.$disconnect()
  }
}

/**
 * Finds an user.
 */
export const findOne = async (id: string) => {
  try {
    logger.info('=== User:findOne ===')
    return findById(id)
  } catch ({ message }) {
    logThrownError(message)
  } finally {
    logger.info('=== /User:findMany ===')

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
  } catch ({ message }) {
    logThrownError(message)
  } finally {
    logger.info('=== /User:create ===')

    prisma.$disconnect()
  }
}

/**
 * Updates an existing user.
 */
export const update = async (id: string, data: CreateUserBody) => {
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
  } catch ({ message }) {
    logThrownError(message)
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
  } catch ({ message }) {
    logThrownError(message)
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
    where: { id }
  })
  if (!foundUser) throw new Error(`User ${id} was not found`)
  return foundUser
}
