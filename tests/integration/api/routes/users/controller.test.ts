import request from 'supertest'

/**
 * Helpers.
 */
import { cleanDatabase } from 'helpers/database'
import { startServer, server, closeServer } from 'helpers/server'

/**
 * Builders.
 */
import { UserBuilder } from '~/builders/user'
import { prisma } from '~/common/database'

/**
 * Test suite.
 */
describe('ROUTES: Users', () => {
  beforeAll(startServer)
  beforeEach(cleanDatabase)

  test('should bring all existing users', async () => {
    await new UserBuilder().save()
    await new UserBuilder().save()
    const response = await request(server).get(`/users`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          age: expect.any(Number),
          email: expect.any(String)
        })
      ])
    )
  })

  test('should bring one existing users', async () => {
    const { id } = await new UserBuilder().save()
    const response = await request(server).get(`/users/${id}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        age: expect.any(Number),
        email: expect.any(String)
      })
    )
  })

  test('should save a new user', async () => {
    const user = new UserBuilder().build()

    const response = await request(server).post('/users').send(user)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(String),
      createdAt: expect.any(String)
    })
  })

  test('should update an existing user', async () => {
    const { id } = await new UserBuilder().save()
    const toUpdate = {
      username: 'jane.doe',
      password: '654321',
      firstName: 'Jane',
      lastName: 'Doe',
      age: 30,
      email: 'jane.doe@email.com'
    }
    const response = await request(server).put(`/users/${id}`).send(toUpdate)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id,
      updatedAt: expect.any(String)
    })
  })

  test('should delete an existing user', async () => {
    await new UserBuilder().setEmail('jane.doe@email.com').save()
    const { id } = await new UserBuilder().save()
    const countBeforeDelete = await prisma.user.count()

    const response = await request(server).delete(`/users/${id}`)
    const countAfterDelete = await prisma.user.count()

    expect(response.status).toBe(204)
    expect(countBeforeDelete).toBe(2)
    expect(countAfterDelete).toBe(1)
  })

  test('should return status code 404 trying to find users', async () => {
    const response = await request(server).get('/users')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      code: 404,
      message: expect.any(String)
    })
  })

  test('should return status code 404 trying to find one users', async () => {
    const response = await request(server).get(`/users/c142a3e1-e9de-48a1-bf55-08f623bd57ce`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      code: 404,
      message: expect.any(String)
    })
  })

  afterAll(closeServer)
})
