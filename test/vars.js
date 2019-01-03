const parse = require('date-fns/parse')

exports.person = {
  name: 'Julian',
  email: 'julian@gmail.com',
}

exports.viteamin = {
  name: 'Event 1',
  timeRange: {
    start: parse('2014-02-11T11:30:30'),
    end: parse('2014-02-11T11:30:30'),
  },
  dateRanges: [
    {
      start: parse('2014-02-11T11:30:30'),
      end: parse('2014-02-11T11:30:30'),
    },
  ],
  baseTimeZone: 'UTC',
  duration: 1,
}