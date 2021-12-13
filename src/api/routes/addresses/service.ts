import { ForbiddenError, NotFoundError } from 'routing-controllers'

import { prisma } from '~/common/database'
import { handleThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'

import { CreateAddressRequest } from './@types/createAddress'
import { GetAddressQuery } from './@types/getAddress'

/**
 * Finds address accordingly to data received.
 */
export const findMany = async (userId: string, queryParams: GetAddressQuery) => {
  try {
    logger.info('=== Address:findMany ===')

    logger.info(`Searching many user's "${userId}" addresses`)
    const foundAddresses = await prisma.address.findMany({ where: { userId, ...queryParams } })
    if (foundAddresses.length === 0) throw new NotFoundError(`No address was found`)
    logger.info(`Found "${foundAddresses.length}" addresses`)

    return foundAddresses
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /Address:findMany ===')

    prisma.$disconnect()
  }
}

/**
 * Finds an address.
 */
export const findOne = async (userId: string, addressId: string) => {
  try {
    logger.info('=== Address:findOne ===')
    return findById(userId, addressId)
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /Address:findOne ===')

    prisma.$disconnect()
  }
}

/**
 * Creates a new address.
 */
export const create = async (userId: string, data: CreateAddressRequest) => {
  try {
    logger.info('=== Address:create ===')

    logger.info(`Creating user's "${userId}" address "${JSON.stringify(data)}"`)
    const { id, createdAt } = await prisma.address.create({
      data: { userId, ...data }
    })
    logger.info(`Address "${id}" was successfully created`)

    return { id, createdAt }
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /Address:create ===')

    prisma.$disconnect()
  }
}

/**
 * Updates an existing address.
 */
export const update = async (userId: string, addressId: string, data: CreateAddressRequest) => {
  try {
    logger.info('=== Address:update ===')

    await findById(userId, addressId)

    logger.info(`Updating users's "${userId}" address ${JSON.stringify({ data })}`)
    const { updatedAt } = await prisma.address.update({
      where: { id: addressId },
      data: data
    })

    logger.info(`Address ${addressId} successfully updated`)
    return { id: addressId, updatedAt }
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /Address:update ===')

    prisma.$disconnect()
  }
}

/**
 * Removes an address.
 */
export const remove = async (userId: string, addressId: string) => {
  try {
    logger.info('=== Address:remove ===')

    await findById(userId, addressId)

    logger.info(`Deleting address "${addressId}"`)
    await prisma.address.delete({ where: { id: addressId } })
    logger.info(`Address "${addressId}" successfully deleted`)
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /Address:remove ===')

    prisma.$disconnect()
  }
}

/**
 * Finds address by id.
 */
const findById = async (userId: string, addressId: string) => {
  logger.info(`Searching address "${addressId}"`)
  const foundAddress = await prisma.address.findFirst({
    where: { id: addressId }
  })
  if (!foundAddress) throw new NotFoundError(`Address "${addressId}" was not found`)
  if (foundAddress.userId !== userId) throw new ForbiddenError(`User "${userId}" does not have access to address "${addressId}"`)

  return foundAddress
}
