const { gql } = require('apollo-server')

const typeDefs = gql`
  type Location {
    name: String
    longitude: Float
    latitude: Float
  }

  type Query {
    locations: [Location]
    location(id: Int!): Location
  }
`

module.exports = typeDefs
