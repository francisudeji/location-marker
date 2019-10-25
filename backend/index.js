require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')

function connectToDatabase() {
  mongoose.Promise = global.Promise
  mongoose
    .connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.log({ err })
      connectToDatabase()
    })
}

const server = new ApolloServer({ cors: true, typeDefs, resolvers })

server.listen().then(({ url }) => {
  connectToDatabase()
  console.log(`🚀  Server ready at ${url}`)
})
