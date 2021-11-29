import request from 'supertest'

/**
 * Helpers.
 */
import { startServer, closeServer, server } from 'tests/helpers/server'

/**
 * Test suite.
 */
describe('MIDDLEWARES: Error Handler', () => {
  beforeAll(startServer)

  const randomToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  test('should return status code 404 because of not found route', done => {
    request(server).get('/not-found-route').expect(404, done)
  })

  test('should return status code 400 because of invalid body', async () => {
    const response = await request(server).post(`/user`)
    expect(response.statusCode).toBe(400)
    expect(response.body.code).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  test('should return status code 401 because of missing token', async () => {
    const response = await request(server).get(`/user`)
    expect(response.statusCode).toBe(401)
    expect(response.body.code).toBe(401)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  test('should return status code 403 because of invalid token', async () => {
    const response = await request(server).get(`/user`).set({
      authorization: randomToken
    })
    expect(response.statusCode).toBe(403)
    expect(response.body.code).toBe(403)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  afterAll(closeServer)
})
