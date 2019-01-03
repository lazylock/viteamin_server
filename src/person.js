const mongoose = require('mongoose')

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

const Person = mongoose.model('Person', personSchema)
module.exports = Person