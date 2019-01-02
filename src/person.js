const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/viteamin'
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