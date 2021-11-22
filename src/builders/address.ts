import { User } from '.prisma/client'

import { prisma } from '~/common/database'

/**
 * Other builders.
 */
import { UserBuilder } from './user'

/**
 * Builder.
 */
export class AddressBuilder {
  private number = 10
  private street = 'John Doe Street'
  private city = 'John Doe City'
  private user: User

  setNumber(number: number) {
    this.number = number
    return this
  }

  setStreet(street: string) {
    this.street = street
    return this
  }

  setCity(city: string) {
    this.city = city
    return this
  }

  setUser(user: User) {
    this.user = user
    return this
  }

  /**
   * Returns an instance.
   */
  async build() {
    return {
      number: this.number,
      street: this.street,
      city: this.city,
      user: this.user || (await new UserBuilder().save())
    }
  }

  /**
   * Saves freshly built address.
   */
  async save() {
    const data = await this.build()
    return prisma.address.create({ data: { number: data.number, street: data.street, city: data.city, userId: data.user.id } })
  }
}
