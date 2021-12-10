import request from 'supertest'

import { prisma } from '~/common/database'

/**
 * Helpers.
 */
import { cleanDatabase } from 'helpers/database'
import { startServer, server, closeServer } from 'helpers/server'

/**
 * Builders.
 */
import { AddressBuilder } from 'helpers/builders/address'
import { UserBuilder } from 'helpers/builders/user'

/**
 * Test suite.
 */
describe('ROUTES: Addresses', () => {
  beforeAll(startServer)
  beforeEach(cleanDatabase)

  test(`should bring all logged user's addresses`, async () => {
    const userToLogin = await new UserBuilder().save()
    const addressToGet = await new AddressBuilder().setUser(userToLogin).save()

    const anotherUser = await new UserBuilder().setUsername('jane.doe').setEmail('jane.doe@email.com').save()
    await new AddressBuilder().setUser(anotherUser).save()

    const tokenResponse = await request(server).post(`/login`).send({
      username: userToLogin.username,
      password: userToLogin.password
    })
    const response = await request(server).get(`/user/addresses`).set({ authorization: tokenResponse.body.token })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: addressToGet.id,
          number: addressToGet.number,
          street: addressToGet.street,
          city: addressToGet.city,
          createdAt: addressToGet.createdAt.toISOString(),
          updatedAt: addressToGet.updatedAt.toISOString(),
          userId: userToLogin.id
        })
      ])
    )
  })

  test(`should bring one logged user's address`, async () => {
    const userToLogin = await new UserBuilder().save()
    const addressToGet = await new AddressBuilder().setUser(userToLogin).save()

    const tokenResponse = await request(server).post(`/login`).send({
      username: userToLogin.username,
      password: userToLogin.password
    })
    const response = await request(server).get(`/user/addresses/${addressToGet.id}`).set({ authorization: tokenResponse.body.token })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: addressToGet.id,
        number: addressToGet.number,
        street: addressToGet.street,
        city: addressToGet.city,
        createdAt: addressToGet.createdAt.toISOString(),
        updatedAt: addressToGet.updatedAt.toISOString(),
        userId: userToLogin.id
      })
    )
  })

  test(`should save a new address to the current user`, async () => {
    const userToLogin = await new UserBuilder().save()
    const addressToSave = await new AddressBuilder().setUser(userToLogin).build()

    const tokenResponse = await request(server).post(`/login`).send({
      username: userToLogin.username,
      password: userToLogin.password
    })
    const response = await request(server).post(`/user/addresses`).set({ authorization: tokenResponse.body.token }).send({
      number: addressToSave.number,
      street: addressToSave.street,
      city: addressToSave.city
    })
    const savedAddress = await prisma.address.findMany()

    expect(response.status).toBe(201)
    expect(savedAddress).toHaveLength(1)
    expect(response.body).toEqual({
      id: savedAddress[0].id,
      createdAt: savedAddress[0].createdAt.toISOString()
    })
    expect(savedAddress[0]).toEqual(
      expect.objectContaining({
        id: response.body.id,
        number: addressToSave.number,
        street: addressToSave.street,
        city: addressToSave.city,
        userId: userToLogin.id
      })
    )
  })

  test(`should update one logged user's address`, async () => {
    const userToLogin = await new UserBuilder().save()
    const address = await new AddressBuilder().setUser(userToLogin).save()

    const tokenResponse = await request(server).post(`/login`).send({
      username: userToLogin.username,
      password: userToLogin.password
    })

    const toUpdate = {
      number: 20,
      street: 'Jane Doe Street',
      city: 'Jane Doe City'
    }
    const response = await request(server)
      .put(`/user/addresses/${address.id}`)
      .set({ authorization: tokenResponse.body.token })
      .send(toUpdate)
    const updatedAddress = await prisma.address.findMany()

    expect(response.status).toBe(200)
    expect(updatedAddress).toHaveLength(1)
    expect(response.body).toEqual({
      id: updatedAddress[0].id,
      updatedAt: updatedAddress[0].updatedAt.toISOString()
    })
    expect(updatedAddress[0]).toEqual(
      expect.objectContaining({
        id: response.body.id,
        number: toUpdate.number,
        street: toUpdate.street,
        city: toUpdate.city,
        userId: userToLogin.id
      })
    )
  })

  test(`should delete one logged user's address`, async () => {
    const userToLogin = await new UserBuilder().save()
    const addressToDelete = await new AddressBuilder().setUser(userToLogin).save()

    const anotherUser = await new UserBuilder().setUsername('jane.doe').setEmail('jane.doe@email.com').save()
    const addressToKeep = await new AddressBuilder().setUser(anotherUser).save()

    const countBeforeDelete = await prisma.address.count()

    const tokenResponse = await request(server).post(`/login`).send({
      username: userToLogin.username,
      password: userToLogin.password
    })

    const response = await request(server).delete(`/user/addresses/${addressToDelete.id}`).set({ authorization: tokenResponse.body.token })
    const savedAddress = await prisma.address.findMany()
    const countAfterDelete = await prisma.address.count()

    expect(response.status).toBe(204)
    expect(countBeforeDelete).toBe(2)
    expect(countAfterDelete).toBe(1)
    expect(savedAddress).toHaveLength(1)
    expect(savedAddress[0]).toEqual(addressToKeep)
  })

  test(`should bring one logged user's addresses using street's name in query`, async () => {
    const user = await new UserBuilder().save()
    const address1 = await new AddressBuilder().setUser(user).save()
    await new AddressBuilder().setUser(user).setStreet('Jane Doe').save()

    const tokenResponse = await request(server).post(`/login`).send({
      username: user.username,
      password: user.password
    })
    const response = await request(server)
      .get(`/user/addresses`)
      .set({ authorization: tokenResponse.body.token })
      .query({ street: address1.street })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: address1.id,
          number: address1.number,
          street: address1.street,
          city: address1.city,
          createdAt: address1.createdAt.toISOString(),
          updatedAt: address1.updatedAt.toISOString(),
          userId: user.id
        })
      ])
    )
  })

  test(`should bring two logged user's addresses using city's name in query`, async () => {
    const user = await new UserBuilder().save()
    const address1 = await new AddressBuilder().setUser(user).save()
    const address2 = await new AddressBuilder().setUser(user).setStreet('Jane Doe').save()

    const tokenResponse = await request(server).post(`/login`).send({
      username: user.username,
      password: user.password
    })
    const response = await request(server)
      .get(`/user/addresses`)
      .set({ authorization: tokenResponse.body.token })
      .query({ city: address1.city })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: address1.id,
          number: address1.number,
          street: address1.street,
          city: address1.city,
          createdAt: address1.createdAt.toISOString(),
          updatedAt: address1.updatedAt.toISOString(),
          userId: user.id
        },
        {
          id: address2.id,
          number: address2.number,
          street: address2.street,
          city: address2.city,
          createdAt: address2.createdAt.toISOString(),
          updatedAt: address2.updatedAt.toISOString(),
          userId: user.id
        }
      ])
    )
  })

  afterAll(closeServer)
})
