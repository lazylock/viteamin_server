const mongoose = require('mongoose')
const crypto = require('crypto')
const person = require('person')

const code = 'mongodb://localhost:27017/viteamin'
mongoose.connect(code)

const STATUS_OK = 200
const STATUS_USER_ERROR = 422

const viteaminSchema = mongoose.Schema({
  name: String,
  timeRange: {
    start: Date,
    end: Date,
  },
  dateRanges: [
    {
      start: Date,
      end: Date
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
  accessCode: String,
  updateCode: String,
})

const Viteamin = mongoose.Model('event', viteaminSchema)

exports.createViteamin = async (newViteamin) => {
  const viteamin = new Viteamin()
  viteamin.set(newViteamin)
  viteamin.accessCode = await crypto.getRandomBytes(3)
  viteamin.editcode = await crypto.getRandomBytes(3)
  return await viteamin.save()
}

/** 
exports.updateViteamin = async (code, newViteamin) => {
  const viteamin = await Viteamin.findOne({updateCode: code})
  if (!areEqualRanges(viteamin.timeRange, newViteamin.timeRange)) {
    
  }
  if (!viteamin.dateRanges.every(dateRange1 => {
      newViteamin.some(dateRange2 => {
        areEqualRanges(dateRange1, dateRange2)
      })
    })
  ) {
    
  }
  viteamin.set(newViteamin)
  return await viteamin.save()
}
*/

exports.getViteamin = async (code) => {
  return await Viteamin.findOne({accessCode: code})
}

exports.addPerson = async (code, newPerson) => {
  try {
    const viteamin = await Viteamin.findOne({accessCode: code})
    return viteamin.persons.find(person => person.name === newPerson.name)
  } catch(error) {
    return await viteamin.persons.push(newPerson)
  }
}

exports.updatePerson = async (code, updatePerson) => {
  const viteamin = await Viteamin.findOne({accessCode: code})
  const person = viteamin.persons.find(person => person.name === newPerson.name)
  person.dateRanges = updatedPerson.dateRanges
  return await viteamin.save()
}

function areEqualRanges(dateRange1, dateRange2) {
  return (dateRange1.start === dateRange2.start && dateRange1.end === dateRange2.end)
}