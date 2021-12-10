import request from 'supertest'

/**
 * Helpers.
 */
import { cleanDatabase } from 'helpers/database'
import { startServer, server, closeServer } from 'helpers/server'

/**
 * Builders.
 */
import { UserBuilder } from 'helpers/builders/user'

/**
 * Test suite.
 */
describe('ROUTES: Login', () => {
  beforeAll(startServer)
  beforeEach(cleanDatabase)

  test('should login successfully', async () => {
    const user = await new UserBuilder().save()
    const response = await request(server).post(`/login`).send({
      username: user.username,
      password: user.password
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        expiresInSeconds: expect.any(String)
      })
    )
  })

  test('should fail to find user', async () => {
    const response = await request(server).post(`/login`).send({
      username: 'johnDoe',
      password: '123456789012'
    })

    expect(response.status).toBe(404)
  })

  test('should fail login because of incorrect password', async () => {
    const user = await new UserBuilder().save()
    const response = await request(server).post(`/login`).send({
      username: user.username,
      password: '210987654321'
    })

    expect(response.status).toBe(401)
  })

  afterAll(closeServer)
})
