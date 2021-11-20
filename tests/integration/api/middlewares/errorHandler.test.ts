import request from 'supertest'

import { startServer, closeServer, runningServer as server } from 'tests/helpers/server'

describe('MIDDLEWARES: Error Handler', () => {
  beforeAll(startServer)

  test('should return status code 404', done => {
    request(server).get(`/foo`).expect(404, done)
  })

  test('should return status code 400', async () => {
    const getResponse = await request(server).get(`/error-sample`)
    expect(getResponse.statusCode).toBe(400)
    expect(getResponse.body.code).toBe(400)
    expect(getResponse.body.message).toBeDefined()
    expect(getResponse.body.message.length).toBeGreaterThan(0)
  })

  afterAll(closeServer)
})
