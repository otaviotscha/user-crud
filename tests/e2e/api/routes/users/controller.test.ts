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
 * Database.
 */
import { prisma } from '~/common/database'
import { AddressBuilder } from 'helpers/builders/address'

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
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
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
    expect(savedUser[0]).toEqual(
      expect.objectContaining({
        id: response.body.id,
        username: userBuild.username,
        firstName: userBuild.firstName,
        lastName: userBuild.lastName,
        email: userBuild.email
      })
    )
  })

  test('should completely update an user', async () => {
    const user = await new UserBuilder().save()
    const tokenResponse = await request(server).post(`/login`).send({
      username: user.username,
      password: user.password
    })

    const toUpdate = {
      username: 'janeDoe',
      password: '210987654321',
      firstName: 'Jane',
      lastName: 'Doe',
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
    expect(updatedUser[0]).toEqual(
      expect.objectContaining({
        id: response.body.id,
        username: toUpdate.username,
        firstName: toUpdate.firstName,
        lastName: toUpdate.lastName,
        email: toUpdate.email
      })
    )
  })

  test('should partially update an user', async () => {
    const user = await new UserBuilder().save()
    const tokenResponse = await request(server).post(`/login`).send({
      username: user.username,
      password: user.password
    })

    const toUpdate = {
      firstName: 'Jane',
      lastName: 'Doe'
    }
    const response = await request(server).put(`/user`).set({ authorization: tokenResponse.body.token }).send(toUpdate)
    const updatedUser = await prisma.user.findMany()

    expect(response.status).toBe(200)
    expect(updatedUser).toHaveLength(1)
    expect(response.body).toEqual({
      id: updatedUser[0].id,
      updatedAt: updatedUser[0].updatedAt.toISOString()
    })
    expect(updatedUser[0]).toEqual(
      expect.objectContaining({
        id: response.body.id,
        username: user.username,
        firstName: toUpdate.firstName,
        lastName: toUpdate.lastName,
        email: user.email
      })
    )
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
    expect(savedUsers[0]).toEqual({ ...userToKeep, password: savedUsers[0].password })
  })

  test('should bring one user with two addresses', async () => {
    const user = await new UserBuilder().save()
    const address1 = await new AddressBuilder().setUser(user).save()
    const address2 = await new AddressBuilder().setUser(user).save()

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
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        addresses: [
          {
            id: address1.id,
            number: address1.number,
            street: address1.street,
            city: address1.city,
            userId: user.id,
            createdAt: address1.createdAt.toISOString(),
            updatedAt: address1.updatedAt.toISOString()
          },
          {
            id: address2.id,
            number: address2.number,
            street: address2.street,
            city: address2.city,
            userId: user.id,
            createdAt: address2.createdAt.toISOString(),
            updatedAt: address2.updatedAt.toISOString()
          }
        ]
      })
    )
  })

  afterAll(closeServer)
})
