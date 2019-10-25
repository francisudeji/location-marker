const locationService = require('./services/location-service')

const resolvers = {
  Query: {
    locations: async () => {
      return await locationService.getLocations()
    }
  },
  Mutation: {
    addLocation: async (_, { name }, __) => {
      const geoLocation = await locationService.getGeoLocation(name)

      if (geoLocation.results && !geoLocation.results.length) {
        return geoLocation
      }

      return await locationService.addLocation({ ...geoLocation })
    },
    deleteLocation: async (_, { id }, __) => {
      return await locationService.deleteLocation(id)
    },
    editLocation: async (_, { id, name }, __) => {
      const geoLocation = await locationService.getGeoLocation(name)

      if (geoLocation.results && !geoLocation.results.length) {
        return geoLocation
      }

      const editedGeolocation = await locationService.editLocation(
        id,
        geoLocation
      )

      return editedGeolocation
    }
  }
}

module.exports = resolvers
