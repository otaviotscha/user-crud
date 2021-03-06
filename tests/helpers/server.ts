import { Server } from 'http'

/**
 * Helpers / common.
 */
import { logger } from '~/common/logger'
import { redisClient } from '~/common/redis'

/**
 * Environment.
 */
import { PORT } from '~/config/env'

/**
 * Server.
 */
import { server as applicationServer } from '~/server'

/**
 * Testing server instance.
 */
export let server: Server

/**
 * Starts testing server.
 */
export const startServer = async (): Promise<void> => {
  const app = await applicationServer()
  server = app.listen(PORT, () => logger.info(`Test server is running on port: ${PORT}!`))
}

/**
 * Closes testing server.
 */
export const closeServer = async (): Promise<void> => {
  await redisClient.close()
  return new Promise(resolve => server.close(() => resolve()))
}
