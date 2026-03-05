import "dotenv/config"
import { env } from '@prisma/config'
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client"

const seed = async () => {
  try {

    const adapter = new PrismaPg({
      connectionString: env('DATABASE_URL')
    })

    const prisma = new PrismaClient({ adapter })

      const user = await prisma.user.create({
        data: {
          name: 'cheban',
          surname: 'liubomir',
          email: 'qwqzx1485@gmail.com',
          password: 'rfkmpkerdfer',
        }
      })
      console.log(user)
      return
  } catch(e) {
    console.log(e)
  }
}

seed()
