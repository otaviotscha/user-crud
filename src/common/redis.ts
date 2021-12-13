import Redis from 'ioredis'

import { REDIS_URL, TOKEN_EXPIRATION } from '~/config/env'
import { logger } from './logger'

class RedisClient {
  private client: Redis.Redis

  /**
   * Connect to Redis.
   */
  constructor() {
    this.client = new Redis(REDIS_URL)
    logger.info('Connected to Redis')
  }

  /**
   * Adds logged user with its token to Redis.
   */
  public addLoggedUser = async (userId: string, token: string): Promise<string> => {
    await this.client.set(userId, token, 'EX', TOKEN_EXPIRATION)
    logger.info(`User "${userId}" was added to logged users list`)
    return userId
  }

  /**
   * Deletes user with its token from Redis.
   */
  public removeLoggedUserById = async (userId: string): Promise<string> => {
    await this.client.del(userId)
    logger.info(`User "${userId}" was removed from logged users list`)
    return userId
  }

  /**
   * Returns true if user is already logged in.
   */
  public isUserLoggedIn = async (userId: string): Promise<string | null> => {
    return this.client.get(userId)
  }

  /**
   * Manually closes Redis connection.
   */
  public close = async (): Promise<void> => {
    return this.client.disconnect()
  }
}

export const redisClient = new RedisClient()
