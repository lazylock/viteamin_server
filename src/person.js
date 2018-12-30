const mongoose = require('mongoose')
const url = ''
mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  email: String,
  dateRanges: [
    {
      startDate: Date,
      endDate: Date,
    },
  ],
})

const Person = mongoose.Model('person', personSchema)

exports.editPerson = (newPerson) => {
  Person.findById(newPerson.id, (error, person) => {
    if (error) {
      reject(error)
    } else {
      person.dates = newPerson.dates
      person.save()
    }
  })
}