/**
 * Builders.
 */
import { UserBuilder } from '~/builders/user'

/**
 * Test suite.
 */
describe('BUILDERS: User', () => {
  test('should confirm that all set functions work', async () => {
    const expectedUser = {
      username: 'janeDoe',
      password: '210987654321',
      firstName: 'Jane',
      lastName: 'Doee',
      email: 'jane.doe@email.com'
    }

    const builderUser = new UserBuilder()
      .setUsername(expectedUser.username)
      .setPassword(expectedUser.password)
      .setFirstName(expectedUser.firstName)
      .setLastName(expectedUser.lastName)
      .setEmail(expectedUser.email)
      .build()

    expect(builderUser).toEqual(expect.objectContaining(expectedUser))
  })

  test('should confirm that user was properly built', async () => {
    const user = new UserBuilder().build()

    expect(user).toEqual({
      username: 'johnDoe',
      password: '123456789012',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com'
    })
  })
})
