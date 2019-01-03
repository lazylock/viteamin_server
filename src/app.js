const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const Person = require('./person')
const Viteamin = require('./viteamin')

const STATUS_OK = 200
const STATUS_USER_ERROR = 422

const server = express()
server.use(bodyParser.json())

server.post('/create', async (request, response) => {
  if (request.body.viteamin) {
    try {
      const viteamin = await Viteamin.createViteamin(request.body.viteamin)
      response.status(STATUS_OK)
      response.set({'Content-type': 'application/json'})
      response.send(viteamin)
    } catch(error) {
      throw error
    }
  } else {
    response.set({'Content-type': 'text/plain'})
    response.status(STATUS_USER_ERROR)
    response.send('Must provide a viteamin via query string.')
  }
})

server.post('/:code/update', async (request, response) => {
  if (request.body.person) {
    try {
      const person = await Viteamin.updatePerson(request.params.code, request.body.person)
      response.status(STATUS_OK)
      response.set({'Content-type': 'text/plain'})
      response.send(person._id)
    } catch(error) {
      throw error
    }
  } else {
    response.set({'Content-type': 'text/plain'})
    response.status(STATUS_USER_ERROR)
    response.send('Must provide a person via query string.')
  }
})

server.post('/:code/add', async (request, response) => {
  if (request.body.person) {
    try {
      const person = await Viteamin.addPerson(request.params.code, request.body.person)
      response.status(STATUS_OK)
      response.set({'Content-type': 'text/plain'})
      response.send(person)
    } catch(error) {
      throw error
    }
  } else {
    response.set({'Content-type': 'text/plain'})
    response.status(STATUS_USER_ERROR)
    response.send('Must provide a person via query string.')
  }
})

server.get('/:code', async (request, response) => {
  try {
    const viteamin = await Viteamin.getViteamin(request.params.code)
    response.send(viteamin)
  } catch(error) {
    throw error
  }
})

/**
async function asyncHelper(request, response, next) {
  Promise.resolve(request, response, next).catch(next)
}
*/

const port = 3000
console.log('Listening at 127.0.0.1:' + port)
server.listen(port)