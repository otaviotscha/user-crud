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

/**
 * Database.
 */
import { prisma } from '~/common/database'

/**
 * Test suite.
 */
describe('ROUTES: Users', () => {
  beforeAll(startServer)
  beforeEach(cleanDatabase)

  test('should bring one user', async () => {
    const user = await new UserBuilder().save()
    const tokenResponse = await request(server).post(`/login`).send({
      username: user.username,
      password: user.password
    })
    const userResponse = await request(server).get(`/user`).set({ authorization: tokenResponse.body.token })

    expect(userResponse.status).toBe(200)
    expect(userResponse.body).toEqual(
      expect.objectContaining({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email
      })
    )
  })

  test('should save a new user', async () => {
    const userBuild = new UserBuilder().build()

    const response = await request(server).post('/user').send(userBuild)
    const savedUser = await prisma.user.findMany()

    expect(response.status).toBe(201)
    expect(savedUser).toHaveLength(1)
    expect(response.body).toEqual({
      id: savedUser[0].id,
      createdAt: savedUser[0].createdAt.toISOString()
    })
  })

  test('should update an user', async () => {
    const user = await new UserBuilder().save()
    const tokenResponse = await request(server).post(`/login`).send({
      username: user.username,
      password: user.password
    })

    const toUpdate = {
      username: 'jane.doe',
      password: '654321',
      firstName: 'Jane',
      lastName: 'Doe',
      age: 30,
      email: 'jane.doe@email.com'
    }
    const response = await request(server).put(`/user`).set({ authorization: tokenResponse.body.token }).send(toUpdate)
    const updatedUser = await prisma.user.findMany()

    expect(response.status).toBe(200)
    expect(updatedUser).toHaveLength(1)
    expect(response.body).toEqual({
      id: updatedUser[0].id,
      updatedAt: updatedUser[0].updatedAt.toISOString()
    })
  })

  test('should delete an user', async () => {
    const userToKeep = await new UserBuilder().setUsername('jane.doe').setEmail('jane.doe@email.com').save()
    const userToDelete = await new UserBuilder().save()
    const countBeforeDelete = await prisma.user.count()

    const tokenResponse = await request(server).post(`/login`).send({
      username: userToDelete.username,
      password: userToDelete.password
    })

    const response = await request(server).delete(`/user`).set({ authorization: tokenResponse.body.token })
    const savedUsers = await prisma.user.findMany()
    const countAfterDelete = await prisma.user.count()

    expect(response.status).toBe(204)
    expect(countBeforeDelete).toBe(2)
    expect(countAfterDelete).toBe(1)
    expect(savedUsers).toHaveLength(1)
    expect(savedUsers[0]).toEqual(userToKeep)
  })

  afterAll(closeServer)
})
