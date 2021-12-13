/**
 * Environment types.
 */
export enum EnvironmentType {
  DEV = 'development',
  TEST = 'test',
  PRODUCTION = 'production'
}

/**
 * .env file defaults.
 */
export enum EnvironmentDefault {
  PORT = '4000',
  TOKEN_SECRET = 'usercrud',
  TOKEN_EXPIRATION = '3600',
  REDIS_URL = 'redis://redis@localhost:6379'
}
