const mongoose = require('mongoose')
const crypto = require('crypto')
const person = require('person')
const url = ''
mongoose.connect(url)

const viteaminSchema = mongoose.Schema({
  name: String,
  timeRange: {
    startTime: Date,
    endTime: Date,
  },
  dateRanges: [
    {
      startDate: Date,
      endDate: Date
    },
  ],
  baseTimeZone: String,
  eventDate: Date,
  duration: Number,
  adminEmail: String,
  notifyAdmin: Boolean,
  notifyNumPersons: Number,
  allowEdit: Boolean,
  persons: [person],
  accessUrl: String,
  editUrl: String,
})

const Viteamin = mongoose.Model('event', viteaminSchema)

exports.createViteamin = (newViteamin) => {
  const viteamin = new Viteamin()
  viteamin.set(newViteamin)

  viteamin.accessUrl = generateRandomString((error, randString) => {
    if (error) {
      reject(error)
    } else {
      resolve(null, randString)
    }
  })

  viteamin.editUrl = generateRandomString((error, randString) => {
    if (error) {
      reject(error)
    } else {
      resolve(null, randString)
    }  
  })

  viteamin.save((error, viteamin) => {
    if (error) {
      reject(error)
    } else {
      resolve(null, viteamin)
    }
  })
}

exports.getViteamin = (url) => {
  Viteamin.findOne({accessUrl: url}, (error,viteamin) => {
    if (error) {
      reject(error)
    } else {
      resolve(viteamin)
    }
  })
}

exports.addPerson = (url, newPerson) => {
  Viteamin.findOne({accessUrl: url}, (error, viteamin) => {
    if (error) {
      reject(error)
    } else {
      viteamin.persons.push(newPerson)
    }
  })
}

function generateRandomString(){
  const randString = crypto.getRandomBytes(3, (error, bytes) => {
    if (error) {
      throw error
    } else {
      return bytes.toString('hex')
    }
  })
}