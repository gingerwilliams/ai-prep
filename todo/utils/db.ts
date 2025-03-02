import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    // caching the connection to global
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma