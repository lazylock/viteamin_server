const mongoose = require('mongoose')
const url = ''
mongoose.connect(url)

const personSchema = mongoose.Schema({
  _id: new mongoose.Types.ObjectId(),
  name: String,
  email: String,
  dateRanges: [
    {
      startDate: Date,
      endDate: Date,
    },
  ],
})

const person = mongoose.Model('person', personSchema)