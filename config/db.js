const keys = require('./keys')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
function connectToDatabase(uri) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(uri || keys.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })

      .then(() => resolve('Connected'))
      .catch(err => reject(err))
  })
}

function disconnectFromDatabase() {
  return mongoose.disconnect()
}

module.exports = { connectToDatabase, disconnectFromDatabase }
