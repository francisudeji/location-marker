const locationService = require('./services/location-service')

const resolvers = {
  Query: {
    locations: async () => {
      return await locationService.getLocations()
    }
  },
  Mutation: {
    addLocation: async (parent, { name }, ctx) => {
      const location = await locationService.getGeoLocation(name)

      return await locationService.addLocation({ ...location })
    },
    deleteLocation: async (parent, args, ctx) => {
      return await locationService.deleteLocation(args.id)
    }
  }
}

module.exports = resolvers
