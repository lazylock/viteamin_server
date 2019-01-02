const mocha = require('mocha')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const url = 'mongodb://localhost:27017/viteamin'
mongoose.connect(url)

describe('Test Connection', () => {
  before((done) => {
    mongoose.connection.once('open', () => {
      console.log('Connection successful!')
      done()
    }).on(error, (error) => {
      console.log('Connection error: ', error)
    })
  })
})