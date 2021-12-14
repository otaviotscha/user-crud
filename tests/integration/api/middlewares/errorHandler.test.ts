import request from 'supertest'

/**
 * Helpers / common.
 */
import { startServer, closeServer, server } from 'tests/helpers/server'

/**
 * Test suite.
 */
describe('MIDDLEWARES: Error Handler', () => {
  beforeAll(startServer)

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

  afterAll(closeServer)
})
