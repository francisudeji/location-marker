const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  longitude: {
    type: Number,
    required: true,
    unique: true
  },
  latitude: {
    type: Number,
    required: true,
    unique: true
  }
})

LocationSchema.plugin(timestamp)

const Location = mongoose.model('locations', LocationSchema)

module.exports = Location
