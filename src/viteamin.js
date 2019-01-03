const mongoose = require('mongoose')
const crypto = require('crypto')
const Person = require('./person')

const url = 'mongodb://localhost:27017/viteamin'
mongoose.connect(url, { useNewUrlParser: true })

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
  notifyNumPeople: Number,
  allowEdit: Boolean,
  people: [{
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
  viteamin.accessCode = await crypto.randomBytes(3).toString('hex')
  viteamin.updateCode = await crypto.randomBytes(3).toString('hex')
  return await viteamin.save()
}

exports.getViteamin = async (code) => {
  return await Viteamin.findOne({accessCode: code}).populate('people')
}

exports.addPerson = async (code, newPerson) => {
  const viteamin = await Viteamin.findOne({accessCode: code}).populate('people')
  const person = new Person()
  person.set(newPerson)
  await person.save()
  viteamin.people.push(person)
  return await viteamin.save()
}

exports.updatePerson = async (code, updatedPerson) => {
  const viteamin = await Viteamin.findOne({accessCode: code}).populate('people')
  const person = viteamin.people.find(person => person.name === newPerson.name)
  person.dateRanges = updatedPerson.dateRanges
  return await viteamin.save()
}