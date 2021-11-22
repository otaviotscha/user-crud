import request from 'supertest'

import { startServer, closeServer, server } from 'tests/helpers/server'

describe('ROUTES: Health Check', () => {
  beforeAll(startServer)

  test('should return status code 204', done => {
    request(server).get('/health-check').expect(204, done)
  })

  afterAll(closeServer)
})
