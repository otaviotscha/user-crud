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
  if (isTestEnvironment()) return '.env.dev'
  return '.env'
})()

config({ path: resolve(__dirname, '..', '..', fileName) })

if (isProductionEnvironment() && !process.env.TOKEN_SECRET) throw new Error('A token secret must be supplied')

export const {
  PORT = Default.PORT,
  NODE_ENV = EnvironmentType.DEV,
  TOKEN_SECRET = Default.TOKEN_SECRET,
  TOKEN_EXPIRATION = Default.TOKEN_EXPIRATION
} = process.env
