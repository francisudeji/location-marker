const Location = require('./models/Location')

const allLocations = [
  { id: 1, name: 'Oshodi', longitude: 3.53231, latitude: 4.534221 },
  { id: 2, name: 'Ojota', longitude: 1.87242, latitude: 5.241241 }
]

const resolvers = {
  Query: {
    locations: async () => {
      const locations = await Location.find({}).catch(err => console.log(err))
      return allLocations
    },
    location: async (parent, args, ctx) => {
      return allLocations.find(l => l.id === args.id)
    }
  }
}

module.exports = resolvers
