import { createLogger, transports } from 'winston'

import { NODE_ENV } from '~/config/env'
import { EnvironmentType } from '~/@types/environment'
import { consoleOptions } from '~/config/logger'

/**
 * Log transports.
 */
const transportsLogger =
  NODE_ENV === EnvironmentType.PRODUCTION ? [new transports.Console(consoleOptions)] : [new transports.Console(consoleOptions)]

/**
 * Create logger.
 */
export const logger = createLogger({
  transports: transportsLogger
})
