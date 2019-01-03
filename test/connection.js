const mongoose = require('mongoose')
mongoose.Promise = global.Promise

before((done) => {
  const url = 'mongodb://localhost/viteamin'
  mongoose.connect(url, { useNewUrlParser: true })
  mongoose.connection.once('open', () => {
    console.log('Connection successful!')
    done()
  }).on('error', (error) => {
    console.log('Connection error: ', error)
  })
})