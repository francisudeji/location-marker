const Location = require('../models/Location')
const keys = require('../config/keys')
const axios = require('axios')

const locationServices = {
  async getGeoLocation(name) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${keys.GOOGLE_API_KEY}`
    try {
      const response = await axios.get(url)
      const data = await response.data

      if (data.status === 'ZERO_RESULTS') {
        return data
      }

      const {
        address_components: [first],
        geometry: { location }
      } = data.results[0]

      return {
        name: first.long_name,
        longitude: location.lng,
        latitude: location.lat
      }
    } catch (err) {
      console.log('Error fetching location info', { err })
    }
  },
  async addLocation(newLocation) {
    try {
      const location = new Location({ ...newLocation })
      const savedLocation = await location.save()

      return savedLocation
    } catch (error) {
      console.log(error)
    }
  },
  async getLocations() {
    try {
      const locations = await Location.find({})
      return locations
    } catch (error) {
      console.log(error)
    }
  },
  editLocation() {},
  async deleteLocation(_id) {
    try {
      const deleted = await Location.findOneAndDelete({ _id })
      console.log({ deleted })
      return deleted
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = locationServices
