/**
 * Helpers.
 */
import { prisma } from '~/common/database'

/**
 * Builder.
 */
export class UserBuilder {
  private username = 'john.doe'
  private password = 'pass'
  private firstName = 'John'
  private lastName = 'Doe'
  private age = 20
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

  setAge(age: number) {
    this.age = age
    return this
  }

  setEmail(email: string) {
    this.email = email
    return this
  }

  build() {
    return {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
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
