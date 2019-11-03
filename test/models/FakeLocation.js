const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const FakeLocationSchema = new mongoose.Schema({
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

FakeLocationSchema.plugin(timestamp)

const FakeLocation = mongoose.model('locations', FakeLocationSchema)

module.exports = FakeLocation
