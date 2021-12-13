import { hashSync, compareSync } from 'bcryptjs'

import { logger } from '~/common/logger'

const saltRounds = 10

/**
 * Hashing password.
 */
export const hashPassword = (rawPassword: string): string => {
  logger.info('Hashing password')
  return hashSync(rawPassword, saltRounds)
}

/**
 * Compares raw password with the supposed hashed one.
 */
export const comparePasswords = (rawPassword: string, storedPassword: string): boolean => {
  logger.info('Comparing passwords')
  return compareSync(rawPassword, storedPassword)
}
