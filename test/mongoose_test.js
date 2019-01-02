const assert = require('assert')
const vars = require('vars')
const Person = require('../src/person')
const Viteamin = require('../src/viteamin')

describe('Test Mongoose', () => {
  it('Saves event to database', (done) => {
    const viteamin = new Viteamin()
    Object.assign(viteamin, vars.viteamin)

    viteamin.save().then(() => {
      assert(!viteamin.isNew)
      done()
    })
  })

  it('Saves person to database', (done) => {
    const person = new Person()
    Object.assign(person, vars.person)

    person.save().then(() => {
      assert(!person.isNew)
      done()
    })
  })
})