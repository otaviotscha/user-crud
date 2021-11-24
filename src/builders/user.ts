import { prisma } from '~/common/database'

/**
 * Builder.
 */
export class UserBuilder {
  private username = 'john.doe'
  private password = 'pass'
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
  save() {
    const data = this.build()
    return prisma.user.create({ data })
  }
}
