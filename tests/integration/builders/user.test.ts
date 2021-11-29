import { cleanDatabase } from 'helpers/database'
import { UserBuilder } from '~/builders/user'
import { prisma } from '~/common/database'

describe('BUILDERS: User', () => {
  beforeEach(cleanDatabase)

  test('should confirm that user was properly saved', async () => {
    const builderUser = await new UserBuilder().save()
    const expectedUser = {
      username: 'johnDoe',
      password: '123456789012',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com'
    }

    expect(builderUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ...expectedUser
      })
    )

    const databaseUser = await prisma.user.findMany()
    expect(databaseUser).toHaveLength(1)
    expect(databaseUser[0]).toEqual(expect.objectContaining({ id: expect.any(String), ...expectedUser }))
  })
})
