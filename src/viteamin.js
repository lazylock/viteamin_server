const mongoose = require('mongoose')
const crypto = require('crypto')
const person = require('./person')

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
  persons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  }],
  accessCode: String,
  updateCode: String,
})

const Viteamin = mongoose.model('Viteamin', viteaminSchema)
exports = module.exports = Viteamin

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
  return await Viteamin.findOne({accessCode: code}).populate('persons')
}

exports.addPerson = async (code, newPerson) => {
  try {
    const viteamin = await Viteamin.findOne({accessCode: code}).populate('persons')
    return viteamin.persons.find(person => person.name === newPerson.name)
  } catch(error) {
    return await viteamin.persons.push(newPerson)
  }
}

exports.updatePerson = async (code, updatePerson) => {
  const viteamin = await Viteamin.findOne({accessCode: code}).populate('persons')
  const person = viteamin.persons.find(person => person.name === newPerson.name)
  person.dateRanges = updatedPerson.dateRanges
  return await viteamin.save()
}

function areEqualRanges(dateRange1, dateRange2) {
  return (dateRange1.start === dateRange2.start && dateRange1.end === dateRange2.end)
}