import { config } from 'dotenv'
import { resolve } from 'path'

import { EnvironmentType } from '~/@types/environment'

export const isProductionEnvironment = process.env.NODE_ENV === EnvironmentType.PRODUCTION
export const isDevelopmentEnvironment = process.env.NODE_ENV === EnvironmentType.DEV
export const isTestEnvironment = process.env.NODE_ENV === EnvironmentType.TEST

/**
 * Reads from different env files accordingly to current environment.
 */
const fileName = (() => {
  if (isProductionEnvironment) return '.env'
  if (isDevelopmentEnvironment) return '.env.dev'
  return '.env.test'
})()

config({ path: resolve(__dirname, '..', '..', fileName) })

export const { PORT = process.env.PORT ? process.env.PORT : 4000, NODE_ENV = EnvironmentType.DEV } = process.env
