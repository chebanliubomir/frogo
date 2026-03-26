import 'dotenv/config'
import { env } from '@prisma/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

async function seed() {

  const adapter = new PrismaPg({
    connectionString: env("DATABASE_URL")
  })

  const prisma = new PrismaClient({ adapter })

  await prisma.user.create({
    data: {
      name: 'mfwiper',
      surname: "jfwoemrp",
      email: "wmorsp@gmail.com",
      password: "wmfritmroivm4#$#$"
    }
  })

  await prisma.$disconnect()
}

seed()
  .catch(e => {
    console.error(e)
  })
