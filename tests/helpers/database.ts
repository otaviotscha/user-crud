import { Prisma } from '.prisma/client'

import { prisma } from '~/common/database'

/**
 * Deletes everything from every table.
 */
export const cleanDatabase = async () => {
  const modelKeys = Prisma.dmmf.datamodel.models.map(model => model.name)

  for (const table of modelKeys) {
    /**
     * Disables foreign key verification.
     */
    await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" DISABLE TRIGGER ALL`)

    await prisma.$executeRawUnsafe(`TRUNCATE "${table}"`)

    /**
     * Enables foreign key verification.
     */
    await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" ENABLE TRIGGER ALL`)
  }
}

/**
 * Disconnects from database.
 */
export async function disconnect() {
  await prisma.$disconnect()
}
