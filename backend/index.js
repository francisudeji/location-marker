require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')
const { connectToDatabase } = require('./config/db')

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers
})

connectToDatabase()
  .then(() => {
    console.log(`🚀  Connection successful`)
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  })
  .catch(err => console.log('Failed to connect', err))
