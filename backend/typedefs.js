const { gql } = require('apollo-server')

const typeDefs = gql`
  type Location {
    id: ID
    name: String
    longitude: Float
    latitude: Float
  }

  type Query {
    locations: [Location]
  }

  input LocationInput {
    name: String
    longitude: Float
    latitude: Float
  }

  type Mutation {
    addLocation(name: String!): Location
    deleteLocation(id: ID!): Location
  }
`

module.exports = typeDefs
