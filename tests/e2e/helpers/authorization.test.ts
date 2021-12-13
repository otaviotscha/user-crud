import request from 'supertest'

/**
 * Helpers.
 */
import { startServer, closeServer, server } from 'tests/helpers/server'
import { cleanDatabase } from 'helpers/database'
import { UserBuilder } from 'helpers/builders/user'

/**
 * Test suite.
 */
describe('API HELPERS: Authorization', () => {
  beforeAll(startServer)
  beforeAll(cleanDatabase)

  test('should return status code 401 because user from token is not logged in', async () => {
    const userToLogin = await new UserBuilder().save()
    const loginResponse = await request(server).post(`/login`).send({
      username: userToLogin.username,
      password: userToLogin.password
    })

    expect(loginResponse.statusCode).toBe(200)
    expect(loginResponse.body.token).toBeDefined()

    const logoutResponse = await request(server).post(`/logout`).set({
      authorization: loginResponse.body.token
    })

    expect(logoutResponse.statusCode).toBe(204)

    const response = await request(server).get(`/user`).set({
      authorization: loginResponse.body.token
    })
    expect(response.statusCode).toBe(401)
    expect(response.body.code).toBe(401)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  afterAll(closeServer)
})
