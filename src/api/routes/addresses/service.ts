import { NotFoundError } from 'routing-controllers'

import { prisma } from '~/common/database'
import { logThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'
import { CreateAddressBody } from './@types/createAddress'

/**
 * Finds address accordingly to data received.
 */
export const findMany = async () => {
  try {
    logger.info('=== Address:findMany ===')

    logger.info(`Searching all addresses`)
    const foundAddresses = await prisma.address.findMany()
    if (foundAddresses.length === 0) throw new NotFoundError(`No address was found`)
    logger.info(`Found "${foundAddresses.length}" addresses`)

    return foundAddresses
  } catch (error) {
    logThrownError(error)
  } finally {
    logger.info('=== /Address:findMany ===')

    prisma.$disconnect()
  }
}

/**
 * Finds an address.
 */
export const findOne = async (id: string) => {
  try {
    logger.info('=== Address:findOne ===')
    return findById(id)
  } catch (error) {
    logThrownError(error)
  } finally {
    logger.info('=== /Address:findMany ===')

    prisma.$disconnect()
  }
}

/**
 * Creates a new address.
 */
export const create = async (data: CreateAddressBody) => {
  try {
    logger.info('=== Address:create ===')

    logger.info(`Creating address "${JSON.stringify(data)}"`)
    const { id, createdAt } = await prisma.address.create({
      data
    })
    logger.info(`Address "${id}" was successfully created`)

    return { id, createdAt }
  } catch (error) {
    logThrownError(error)
  } finally {
    logger.info('=== /Address:create ===')

    prisma.$disconnect()
  }
}

/**
 * Updates an existing address.
 */
export const update = async (id: string, data: CreateAddressBody) => {
  try {
    logger.info('=== Address:update ===')

    await findById(id)

    logger.info(`Updating address ${JSON.stringify({ id, ...data })}`)
    const { updatedAt } = await prisma.address.update({
      where: { id },
      data: data
    })

    logger.info(`Address ${id} successfully updated`)
    return { id, updatedAt }
  } catch (error) {
    logThrownError(error)
  } finally {
    logger.info('=== /Address:update ===')

    prisma.$disconnect()
  }
}

/**
 * Removes an address.
 */
export const remove = async (id: string) => {
  try {
    logger.info('=== Address:remove ===')

    await findById(id)

    logger.info(`Deleting address "${id}"`)
    await prisma.address.delete({ where: { id } })
    logger.info(`Address "${id}" successfully deleted`)
  } catch (error) {
    logThrownError(error)
  } finally {
    logger.info('=== /Address:remove ===')

    prisma.$disconnect()
  }
}

/**
 * Finds address by id.
 */
export const findById = async (id: string) => {
  logger.info(`Searching address "${id}"`)
  const foundAddress = await prisma.address.findFirst({
    where: { id }
  })
  if (!foundAddress) throw new NotFoundError(`Address ${id} was not found`)
  return foundAddress
}
