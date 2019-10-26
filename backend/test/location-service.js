require('dotenv').config()
const connection = require('../config/db')
const { expect } = require('chai')
const locationService = require('./services/fake-location-service')

describe('Location Service', function() {
  this.timeout(10000)
  console.log(process.env.NODE_ENV, process.env)
  beforeEach(function(done) {
    connection
      .connectToDatabase(process.env.FAKE_MONGODB_URI)
      .then(() => {
        return done()
      })
      .catch(err => done(err))
  })

  // after(function(done) {
  //   connection
  //     .disconnectFromDatabase()
  //     .then(() => done())
  //     .catch(err => done(err))
  // })
  let id

  describe('addLocation()', function() {
    it('should add location and return it', function() {
      const testLocation = {
        name: 'test location1',
        latitude: 2.3456,
        longitude: 3.5432
      }

      locationService
        .addLocation(testLocation)
        .then(location => {
          id = location.id
          expect(location.name).to.be.equal(testLocation.name)
        })
        .catch(err => {
          throw err
        })
    })
  })

  describe('getLocations()', function() {
    it('should return all locations without errors', function() {
      locationService
        .getLocations()
        .then(locations => {
          expect(locations).to.have.length(1)
        })
        .catch(err => {
          throw err
        })
    })
  })

  describe('editLocation()', function() {
    it('should edit location and return updated location', function() {
      locationService
        .editLocation(id, {
          name: 'test location2',
          latitude: 2.3455,
          longitude: 3.5622
        })
        .then(location => {
          expect(location.id).to.be.equal(id)
        })
        .catch(err => {
          throw err
        })
    })
  })

  describe('deleteLocation()', function() {
    it('should delete location', function() {
      locationService
        .deleteLocation(id)
        .then(location => {
          expect(location).to.be.haveOwnProperty('isNew')
        })
        .catch(err => {
          throw err
        })
    })
  })
})
