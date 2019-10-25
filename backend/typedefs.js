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

  type Mutation {
    addLocation(name: String!): Location
    deleteLocation(id: ID!): Location
    editLocation(id: ID!, name: String!): Location
  }
`

module.exports = typeDefs
