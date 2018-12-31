const mongoose = require('mongoose')
const crypto = require('crypto')
const person = require('person')
const url = ''
mongoose.connect(url)

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
  accessUrl: String,
  updateUrl: String,
})

const Viteamin = mongoose.Model('event', viteaminSchema)

exports.createViteamin = async (newViteamin) => {
  const viteamin = new Viteamin()
  viteamin.set(newViteamin)
  viteamin.accessUrl = await crypto.getRandomBytes(3)
  viteamin.editUrl = await crypto.getRandomBytes(3)
  return await viteamin.save()
}

exports.updateViteamin = async (url, newViteamin) => {
  const viteamin = await Viteamin.findOne({updateUrl: url})
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

exports.getViteamin = async (url) => {
  return await Viteamin.findOne({accessUrl: url})
}

exports.addPerson = async (url, newPerson) => {
  const viteamin = await Viteamin.findOne({accessUrl: url})
  return await viteamin.persons.push(newPerson)
}

function areEqualRanges(dateRange1, dateRange2) {
  return (dateRange1.start === dateRange2.start && dateRange1.end === dateRange2.end)
}