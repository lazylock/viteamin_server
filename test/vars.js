const parse = require('date-fns/parse')

exports.person = {
  name: 'Julian',
  email: 'julian@gmail.com',
}

exports.viteamin = {
  name: 'Event 1',
  timeRange: {
    start: parse('08:00:00'),
    end: parse('11:00:00'),
  },
  dateRanges: [
    {
      start: parse('2019-01-11'),
      end: parse('2019-01-18'),
    },
  ],
  baseTimeZone: 'UTC',
  duration: 1,
}