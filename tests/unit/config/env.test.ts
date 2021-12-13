import { isDevelopmentEnvironment, isProductionEnvironment, isTestEnvironment } from '~/config/env'

/**
 * Helpers.
 */
import { startServer, closeServer } from 'tests/helpers/server'

/**
 * Types.
 */
import { EnvironmentDefault as Default, EnvironmentType } from '~/@types/environment'

/**
 * Test suite.
 */
describe('CONFIG: Env', () => {
  beforeAll(startServer)

  test('should confirm that environment is dev', async () => {
    process.env.NODE_ENV = EnvironmentType.DEV
    expect(isDevelopmentEnvironment()).toBeTruthy()

    expect(isTestEnvironment()).toBeFalsy()
    expect(isProductionEnvironment()).toBeFalsy()
  })

  test('should confirm that environment is test', async () => {
    process.env.NODE_ENV = EnvironmentType.TEST
    expect(isTestEnvironment()).toBeTruthy()

    expect(isDevelopmentEnvironment()).toBeFalsy()
    expect(isProductionEnvironment()).toBeFalsy()
  })

  test('should confirm that environment is production', async () => {
    process.env.NODE_ENV = EnvironmentType.PRODUCTION
    expect(isProductionEnvironment()).toBeTruthy()

    expect(isDevelopmentEnvironment()).toBeFalsy()
    expect(isTestEnvironment()).toBeFalsy()
  })

  test('should confirm all env defaults', async () => {
    expect(Default.PORT).toBe('4000')
    expect(Default.TOKEN_SECRET).toBe('usercrud')
    expect(Default.TOKEN_EXPIRATION).toBe('3600')
    expect(Default.REDIS_URL).toBe('redis://redis@localhost:6379')
  })

  afterAll(() => (process.env.NODE_ENV = EnvironmentType.TEST))
  afterAll(closeServer)
})
