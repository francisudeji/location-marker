const FakeLocation = require('../models/FakeLocation')

const fakeLocationServices = {
  async addLocation(newLocation) {
    try {
      const location = new FakeLocation({ ...newLocation })
      const savedLocation = await location.save()

      return savedLocation
    } catch (error) {
      console.log(error)
    }
  },
  async getLocations() {
    try {
      const locations = await FakeLocation.find({})
      return locations
    } catch (error) {
      console.log(error)
    }
  },
  async getLocation(_id) {
    try {
      const location = await FakeLocation.find({ _id })
      return location
    } catch (error) {
      console.log(error)
    }
  },
  async editLocation(_id, newLocation) {
    try {
      const filter = { _id }
      const update = { ...newLocation }
      const editedLocation = await FakeLocation.findOneAndUpdate(
        filter,
        update,
        {
          new: true
        }
      )

      return editedLocation
    } catch (error) {
      console.log(error)
    }
  },
  async deleteLocation(_id) {
    try {
      const deleted = await FakeLocation.findOneAndDelete({ _id })
      return deleted
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = fakeLocationServices
