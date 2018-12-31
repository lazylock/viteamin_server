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

exports.updatePerson = async(newPerson) => {
  return await Person.findByIdAndUpdate(newPerson.id, {dateRanges: newPerson.dateRanges})
}