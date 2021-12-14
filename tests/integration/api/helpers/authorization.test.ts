import request from 'supertest'

/**
 * Helpers / common.
 */
import { startServer, closeServer, server } from 'tests/helpers/server'

/**
 * Test suite.
 */
describe('API HELPERS: Authorization', () => {
  beforeAll(startServer)

  test('should return status code 401 because of missing token', async () => {
    const response = await request(server).get(`/user`)
    expect(response.statusCode).toBe(401)
    expect(response.body.code).toBe(401)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  test('should return status code 401 because of invalid token', async () => {
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

    const response = await request(server).get(`/user`).set({
      authorization: invalidToken
    })
    expect(response.statusCode).toBe(401)
    expect(response.body.code).toBe(401)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  afterAll(closeServer)
})
