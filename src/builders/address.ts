/**
 * Helpers.
 */
import { prisma } from '~/common/database'

/**
 * Builder.
 */
export class AddressBuilder {
  private number = 10
  private street = 'John Doe Street'
  private city = 'John Doe City'

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

  build() {
    return {
      number: this.number,
      street: this.street,
      city: this.city
    }
  }

  /**
   * Saves freshly built address.
   */
  save() {
    const data = this.build()
    return prisma.address.create({ data })
  }
}
