/**
 * Helpers / common.
 */
import { prisma } from '~/common/database'
import { hashPassword } from '~/api/helpers/password'

/**
 * Builder.
 */
export class UserBuilder {
  private username = 'johnDoe'
  private password = '123456789012'
  private firstName = 'John'
  private lastName = 'Doe'
  private email = 'john.doe@email.com'

  setUsername(username: string) {
    this.username = username
    return this
  }

  setPassword(password: string) {
    this.password = password
    return this
  }

  setFirstName(firstName: string) {
    this.firstName = firstName
    return this
  }

  setLastName(lastName: string) {
    this.lastName = lastName
    return this
  }

  setEmail(email: string) {
    this.email = email
    return this
  }

  /**
   * Returns an instance.
   */
  build() {
    return {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    }
  }

  /**
   * Saves freshly built user.
   */
  async save() {
    const data = this.build()
    /**
     * Hashes password to save user.
     */
    const hashedData = { ...data, password: hashPassword(data.password) }
    const savedUser = await prisma.user.create({ data: hashedData })
    /**
     * Returns save user with raw password.
     */
    return { ...savedUser, password: data.password }
  }
}
