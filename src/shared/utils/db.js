const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = prisma
;(async function account() {
  prisma.$use(async (params, next) => {
    try {
      return next(params)
    } catch (error) {
      console.error(error)
    }
  })
})()
