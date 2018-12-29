const mongoose = require('mongoose')
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
  persons: [
    {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Person'
    },
  ],
  accessUrl: String,
  editUrl: String,
})

const Viteamin = mongoose.Model('event', viteaminSchema)

exports.createViteamin = (newViteamin, callback) => {
  const viteamin = new Viteamin()
  Object.assign(viteamin, newViteamin)
  
  //generate unique urls
  viteamin.accessUrl = ''
  viteamin.editUrl = ''

  viteamin.save((error, viteamin) => {
    if (error) {
      callback(error)
    } else {
      callback(null, viteamin)
    }
  })
}

exports.getViteamin = (url, callback) => {
  Viteamin.findOne({accessUrl: url}).populate('persons').exec((error,viteamin) => {
    if (error) {
      callback(error)
    } else {
      callback(null, viteamin)
    }
  })
}

exports.updatePersonInViteamin = () => {}