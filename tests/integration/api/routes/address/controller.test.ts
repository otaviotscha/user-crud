import request from 'supertest'

/**
 * Helpers.
 */
import { cleanDatabase } from 'helpers/database'
import { startServer, server, closeServer } from 'helpers/server'

/**
 * Builders.
 */
import { AddressBuilder } from '~/builders/address'
import { prisma } from '~/common/database'

/**
 * Test suite.
 */
describe('ROUTES: Addresses', () => {
  beforeAll(startServer)
  beforeEach(cleanDatabase)

  test('should bring all existing addresses', async () => {
    await new AddressBuilder().save()
    await new AddressBuilder().save()
    const response = await request(server).get(`/users/addresses`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          number: expect.any(Number),
          street: expect.any(String),
          city: expect.any(String)
        })
      ])
    )
  })

  test('should bring one existing addresses', async () => {
    const { id } = await new AddressBuilder().save()
    const response = await request(server).get(`/users/addresses/${id}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        number: expect.any(Number),
        street: expect.any(String),
        city: expect.any(String)
      })
    )
  })

  test('should save a new address', async () => {
    const address = new AddressBuilder().build()

    const response = await request(server).post('/users/addresses').send(address)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(String),
      createdAt: expect.any(String)
    })
  })

  test('should update an existing address', async () => {
    const { id } = await new AddressBuilder().save()
    const toUpdate = {
      number: 20,
      street: 'Jane Doe Street',
      city: 'Jane Doe City'
    }
    const response = await request(server).put(`/users/addresses/${id}`).send(toUpdate)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id,
      updatedAt: expect.any(String)
    })
  })

  test('should delete an existing address', async () => {
    await new AddressBuilder().save()
    const { id } = await new AddressBuilder().save()
    const countBeforeDelete = await prisma.address.count()

    const response = await request(server).delete(`/users/addresses/${id}`)
    const countAfterDelete = await prisma.address.count()

    expect(response.status).toBe(204)
    expect(countBeforeDelete).toBe(2)
    expect(countAfterDelete).toBe(1)
  })

  test('should return status code 404 trying to find addresses', async () => {
    const response = await request(server).get('/users/addresses')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      code: 404,
      message: expect.any(String)
    })
  })

  test('should return status code 404 trying to find one addresses', async () => {
    const response = await request(server).get(`/users/addresses/c142a3e1-e9de-48a1-bf55-08f623bd57ce`)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      code: 404,
      message: expect.any(String)
    })
  })

  afterAll(closeServer)
})
