import 'dotenv/config'
import { env } from '@prisma/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'

async function seed() {

const adapter = new PrismaPg({
  connectionString: env("DATABASE_URL")
})

const prisma = new PrismaClient({ adapter })

  const user = await prisma.user.create({
    data: {
      name: 'liubomir',
      surname: 'cheban',
      email: 'qwqzx1485@gmail.com',
      password: 'Qwerty123'
    }
  })

  console.log(user)

  await prisma.$disconnect()

}

seed()
  .catch(e => {
    console.error(e)
  })
