import { config } from 'dotenv'
import { resolve } from 'path'

/**
 * Types.
 */
import { EnvironmentDefault as Default, EnvironmentType } from '~/@types/environment'

export const isProductionEnvironment = () => process.env.NODE_ENV === EnvironmentType.PRODUCTION
export const isDevelopmentEnvironment = () => process.env.NODE_ENV === EnvironmentType.DEV
export const isTestEnvironment = () => process.env.NODE_ENV === EnvironmentType.TEST

/**
 * Reads different env files accordingly to current environment.
 */
const fileName = (() => {
  if (isDevelopmentEnvironment()) return '.env.dev'
  if (isTestEnvironment()) return '.env.test'
  return '.env'
})()

config({ path: resolve(__dirname, '..', '..', fileName) })

export const {
  PORT = Default.PORT,
  NODE_ENV = EnvironmentType.DEV,
  SECRET = Default.SECRET,
  TOKEN_EXPIRATION = Default.TOKEN_EXPIRATION
} = process.env
