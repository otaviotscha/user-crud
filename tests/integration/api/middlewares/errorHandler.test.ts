import request from 'supertest'

import { startServer, closeServer, server } from 'tests/helpers/server'

describe('MIDDLEWARES: Error Handler', () => {
  beforeAll(startServer)

  test('should return status code 404', done => {
    request(server).get('/not-found-route').expect(404, done)
  })

  test('should return status code 400', async () => {
    const response = await request(server).post(`/user`)
    expect(response.statusCode).toBe(400)
    expect(response.body.code).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  test('should return status code 401', async () => {
    const response = await request(server).post(`/user/addresses`)
    expect(response.statusCode).toBe(401)
    expect(response.body.code).toBe(401)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  test('should return status code 401', async () => {
    const invalidToken = 'fooToken'
    const response = await request(server).post(`/user/addresses`).set({ authorization: invalidToken })
    expect(response.statusCode).toBe(401)
    expect(response.body.code).toBe(401)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  test('should return status code 403', async () => {
    const randomToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    const response = await request(server).post(`/user/addresses`).set({
      authorization: randomToken
    })
    expect(response.statusCode).toBe(403)
    expect(response.body.code).toBe(403)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  test('should return status code 403', async () => {
    const randomToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    const response = await request(server).post(`/user/addresses`).set({
      authorization: randomToken
    })
    expect(response.statusCode).toBe(403)
    expect(response.body.code).toBe(403)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  afterAll(closeServer)
})
