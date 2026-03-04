import { PrismaClient } from "@prisma/client"

const seed = async () => {
  try {
    const prisma = new PrismaClient()

      const user = await prisma.user.create({
        data: {
          surname: 'liubomir',
          name: 'cheban',
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
